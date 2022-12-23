import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import {
  CButtonGroup, CButton, CCardGroup, CCard, CCardBody, CCardHeader, CCol, CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import RecordAdd from './RecordAdd.js';
import RecordEdit from './RecordEdit.js';
import AllActions from '../../actions'
import Helper from '../../helpers'

class Record extends Component {
  constructor(props) {
    super(props);

    this.dataChangedCallback = this.dataChangedCallback.bind(this);
    this.renderTableList = this.renderTableList.bind(this);
    this.genEmptyObj = this.genEmptyObj.bind(this);

    this.modalToggleAdd = this.modalToggleAdd.bind(this);
    this.modalToggleEdit = this.modalToggleEdit.bind(this);

    this.handleYearMonth = this.handleYearMonth.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      emptyId: -1,
      dataSet: [],
      currentData: {
        id: -1,
        wdate: new Date(),
        title: '',
        deposit: 0,
        withdrawal: 0,
        accountCode: '',
        memo: '',
      },
      currentYear: (new Date().getFullYear()),
      currentMonth: (new Date().getMonth() + 1),
      classCodeMap: [],
      recordBalance: [],
      selectedRpay: null,
      totalCount: 0,
      keyword: "",
      keywordError: "",
      modalFlagAdd: false,
      modalFlagEdit: false,

    };
  }

  dataChangedCallback(modifiedData) {
    console.log("RegularRecord::dataChangedCallback");
    if (modifiedData !== undefined && modifiedData !== null) {
      for (var i = 0; i < this.state.dataSet.length; i++) {
        if (this.state.dataSet[i].id === modifiedData.id) {
          var newDataSet = update(this.state.dataSet, { $splice: [[i, 1, modifiedData]] });
          var renderTimes = this.state.tableRerender + 1;
          this.setState({ tableRerender: renderTimes, dataSet: newDataSet });
          break;
        }
      }
    } else {
      this.requestFetch(this.state.currentYear, this.state.currentMonth);
    }
  }

  requestFetch(year, month) {
    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/record' : '/pds/v1/record';

    const reqUri = REQ_URI + '?year=' + year + '&month=' + month;

    fetch(reqUri, {
      method: 'GET',
      headers: Helper.auth.makeAuthHeader(),
    }).then(function (res) {
      if (!res.ok) {
        if (res.status === 401) {
          window.location = "/#/logout";
        }
        throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
      }
      return res.json();
    }).then(function (resJson) {
      console.log("Record::fetch => " + resJson.result);

      let sortedData = [].concat(resJson.data).sort((a, b) => a.wdate > b.wdate ? -1 : 1);
      let calcBalance = [];
      sortedData.filter(data => {
        if (!calcBalance['deposit']) {
          calcBalance['deposit'] = 0;
          calcBalance['withdrawal'] = 0;
          calcBalance['sum'] = 0;
        }
        calcBalance['deposit'] += data.deposit;
        calcBalance['withdrawal'] += data.withdrawal;
        calcBalance['sum'] += (data.deposit - data.withdrawal);
        return false;
      });

      parentState.setState({
        dataSet: sortedData,
        recordBalance: calcBalance,
        totalCount: sortedData.length,
        keywordError: '',
      });
    }).catch(function (error) {
      console.log("Record::fetch => " + error);
      parentState.setState({ keywordError: error.message })
    });
  }

  componentDidMount() {
    if (this.props.storeDataSync) {
      let classMap = this.props.storeClasses.reduce((map, obj) => {
        map[obj.id] = obj;
        return map;
      }, {});

      let codeMap = this.props.storeCodes.reduce((map, obj) => {
        let newObj = {
          ...obj,
          classInfo: classMap[obj.accountCode.substring(0, 1)],
        }
        map[obj.accountCode] = newObj;
        return map;
      }, {});

      this.setState({
        classCodeMap: codeMap
      });
    }
    let today = new Date();
    this.setState({
      currentYear: (today.getFullYear()),
      currentMonth: (today.getMonth() + 1),
    })
    this.requestFetch(today.getFullYear(), today.getMonth() + 1);
  }

  genEmptyObj() {
    let newEmptyId = (this.state.emptyId ? (this.state.emptyId - 1) : -1);
    let emptyObj = {
      id: newEmptyId,
      wdate: new Date(this.state.currentYear, (this.state.currentMonth - 1), 1),
      title: '',
      deposit: 0,
      withdrawal: 0,
      accountCode: '',
      memo: '',
    }
    this.setState({ emptyId: newEmptyId });
    return emptyObj;
  }

  modalToggleAdd() {
    this.setState({
      currentData: this.genEmptyObj(),
      modalFlagAdd: !this.state.modalFlagAdd,
    });
  }

  modalToggleEdit() {
    this.setState({
      modalFlagEdit: !this.state.modalFlagEdit,
    });
  }

  handleYearMonth(year, month, event) {
    event.preventDefault();
    let reqDate = new Date(year, (month - 1), 1);
    this.setState({ currentYear: reqDate.getFullYear(), currentMonth: (reqDate.getMonth() + 1) });
    this.requestFetch(reqDate.getFullYear(), reqDate.getMonth() + 1);
  }

  handleAdd(e) {
    e.preventDefault();
    let newObj = this.genEmptyObj();
    this.setState({ currentData: newObj });
    this.modalToggleAdd();
  }

  handleEdit(data, e) {
    e.preventDefault();
    this.setState({ currentData: data });
    this.modalToggleEdit();
  }

  renderTableList(dataArray) {
    if (dataArray.length === 0) {
      return (
        <tr key="row-nodata">
          <td colSpan="7" className="text-center align-middle" height="200">No Data</td>
        </tr>
      )
    } else {
      let filteredData = dataArray.filter(data => {
        if (!this.state.selectedRpay) return true;
        return (data.regularPayId === this.state.selectedRpay);
      })
      return filteredData.map((data, index) => {
        return (
          <tr key={'recordData-' + data.id} onClick={this.handleEdit.bind(this, data)}>
            <td>{data.id}</td>
            <td>{Helper.date.dateFormat(new Date(data.wdate))}</td>
            <td>{data.title}</td>
            <td>{this.state.classCodeMap[data.accountCode].classInfo.title +
              `(${data.accountCode.substring(0, 1)}) > `
              + this.state.classCodeMap[data.accountCode].title
              + `(${data.accountCode})`}</td>
            <td align="right"><span style={{ color: 'black' }}>{Helper.num.formatDecimal(data.deposit)}</span></td>
            <td align="right"><span style={{ color: 'blue' }}>{Helper.num.formatDecimal(data.withdrawal)}</span></td>
            <td><div style={{
              width: '140px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>{data.memo}</div></td>
          </tr>
        )
      })
    }
  }

  render() {
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader className="text-center">
                <CButtonGroup>
                  <CButton color="light" onClick={this.handleYearMonth.bind(this, (this.state.currentYear - 1), this.state.currentMonth)}>
                    <CIcon content={freeSet.cilChevronDoubleLeft} size="sm" />
                  </CButton>
                  <CButton color="light" onClick={this.handleYearMonth.bind(this, this.state.currentYear, (this.state.currentMonth - 1))}>
                    <CIcon content={freeSet.cilChevronLeft} size="sm" />
                  </CButton>
                  <CButton color="dark" onClick={this.handleYearMonth.bind(this, (new Date().getFullYear()), (new Date().getMonth() + 1))}>
                    {this.state.currentYear + '년 ' + this.state.currentMonth + '월'}</CButton>
                  <CButton color="light" onClick={this.handleYearMonth.bind(this, this.state.currentYear, (this.state.currentMonth + 1))}>
                    <CIcon content={freeSet.cilChevronRight} size="sm" />
                  </CButton>
                  <CButton color="light" onClick={this.handleYearMonth.bind(this, (this.state.currentYear + 1), this.state.currentMonth)}>
                    <CIcon content={freeSet.cilChevronDoubleRight} size="sm" />
                  </CButton>
                </CButtonGroup>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol className="text-center">
                    <CCardGroup className="m-0">
                      <CCard color='default'>
                        <CCardHeader align="center" className="p-1 small">총 수입금</CCardHeader>
                        <CCardBody align="center" className="p-2">
                          <span style={{ color: 'black' }}>{Helper.num.formatDecimal(this.state.recordBalance['deposit'])}원</span>
                        </CCardBody>
                      </CCard>
                      <CCard color='default'>
                        <CCardHeader align="center" className="p-1 small">총 지출금</CCardHeader>
                        <CCardBody align="center" className="p-2">
                          <span style={{ color: 'blue' }}>{Helper.num.formatDecimal(this.state.recordBalance['withdrawal'])}원</span>
                        </CCardBody>
                      </CCard>
                      <CCard color='default'>
                        <CCardHeader align="center" className="p-1 small">수입 지출 합계</CCardHeader>
                        <CCardBody align="center" className="p-2">
                          <span style={{ color: (this.state.recordBalance['sum'] < 0 ? 'blue' : 'black') }}>{Helper.num.formatDecimal(this.state.recordBalance['sum'])}원</span>
                        </CCardBody>
                      </CCard>
                    </CCardGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Record List</strong>
                <small>  (Total : {this.state.totalCount})</small>
                <span className="float-right">
                  <CButton color="danger" size="sm" variant="ghost">
                    <CIcon content={freeSet.cilTrash} size="sm" />&nbsp;삭제</CButton>
                    &nbsp;
                  <CButton color="success" size="sm" variant="ghost" onClick={this.handleAdd}>
                    <CIcon content={freeSet.cilPlus} size="sm" />&nbsp;추가</CButton>
                </span>
              </CCardHeader>
              <CCardBody>
                <table className="table table-sm table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>정기납명</th>
                      <th>거래일</th>
                      <th>적요</th>
                      <th>입금액</th>
                      <th>출금액</th>
                      <th width="150">메모</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableList(this.state.dataSet)}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <RecordAdd key={"RecordAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <RecordEdit key={"RecordEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />

      </>

    );
  }
}

const mapStateToProps = (state) => ({
  storeDataSync: state.acode.dataSync,
  storeClasses: state.aclass.aclasses,
  storeCodes: state.acode.acodes,
});

const mapDispatchToProps = (dispatch) => ({
  rpayFetch: () => dispatch(AllActions.rpay.rpayFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
