import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
  CCardGroup, CLink,
  CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupAppend, CInputGroupText,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import RegularRecordAdd from './RegularRecordAdd.js';
import RegularRecordEdit from './RegularRecordEdit.js';
import AllActions from '../../actions'
import Helper from '../../helpers'

class RegularRecord extends Component {
  constructor(props) {
    super(props);

    this.dataChangedCallback = this.dataChangedCallback.bind(this);
    this.renderCardList = this.renderCardList.bind(this);
    this.renderTableList = this.renderTableList.bind(this);
    this.genEmptyObj = this.genEmptyObj.bind(this);

    this.modalToggleAdd = this.modalToggleAdd.bind(this);
    this.modalToggleEdit = this.modalToggleEdit.bind(this);

    this.handleCardSelect = this.handleCardSelect.bind(this);

    this.handleViewAll = this.handleViewAll.bind(this);
    this.handleSearchGo = this.handleSearchGo.bind(this);
    this.handlePageChanged = this.handlePageChanged.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      emptyId: -1,
      dataSet: [],
      currentData: {
        id: -1,
        regularPayId: -1,
        wdate: new Date(),
        title: '',
        deposit: 0,
        withdrawal: 0,
        accountCode: '',
        memo: '',
      },
      rpayMap: [],
      rpayBalance: [],
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
      this.requestFetch(this.state.keyword);
    }
  }

  requestFetch(query, page) {
    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/regularRecord' : '/pds/v1/regularRecord';

    const reqUri = REQ_URI + ((query === null || query === undefined) ? '' : '?q=' + query);

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
      console.log("RegularRecord::fetch => " + resJson.result);

      let sortedData = [].concat(resJson.data).sort((a, b) => a.wdate > b.wdate ? -1 : 1);
      let calcBalance = [];
      sortedData.filter(data => {
        if (!calcBalance[data.regularPayId]) {
          calcBalance[data.regularPayId] = 0;
        }
        calcBalance[data.regularPayId] += (data.deposit - data.withdrawal);
        return false;
      });

      parentState.setState({
        dataSet: sortedData,
        rpayBalance: calcBalance,
        totalCount: sortedData.length,
        keywordError: '',
      });
    }).catch(function (error) {
      console.log("RegularRecord::fetch => " + error);
      parentState.setState({ keywordError: error.message })
    });
  }

  componentDidMount() {
    if (!this.props.storeDataSync) {
      this.props.cardFetch();
    } else {
      let cmap = this.props.storeRpays.reduce((map, obj) => {
        map[obj.id] = obj;
        return map;
      }, {});
      this.setState({
        rpayMap: cmap
      })
    }
    this.requestFetch();
  }

  genEmptyObj() {
    let newEmptyId = (this.state.emptyId ? (this.state.emptyId - 1) : -1);
    let emptyObj = {
      id: newEmptyId,
      regularPayId: -1,
      wdate: new Date(),
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

  handleCardSelect(dataId) {
    this.setState({
      selectedRpay: dataId
    })
  }

  handleViewAll() {
    this.setState({ keyword: "" });
    this.requestFetch("");
    document.getElementById("frmRefSearch").reset();
  }

  handlePageChanged(newPage) {
    this.requestFetch(this.state.keyword, newPage);
  }

  handleSearchGo(event) {
    event.preventDefault();
    this.setState({ keyword: event.target.keyword.value });
    this.requestFetch(event.target.keyword.value);
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

  renderCardList(dataArray) {
    return dataArray.map((data, index) => {
      return (data.notUsed === 1) ? '' : (
        <CCard
          key={"rpay-" + data.id}
          color={this.state.selectedRpay === data.id ? 'info' : 'default'}>
          <CCardHeader align="center" className="p-1 small">
            <CLink
              className={this.state.selectedRpay === data.id ? 'text-white' : 'text-muted'}
              onClick={this.handleCardSelect.bind(this, data.id)}>{data.title}</CLink>
          </CCardHeader>
          <CCardBody align="right" className="p-2" style={{ color: this.state.rpayBalance[data.id] < 0 ? 'blue' : 'black' }}>
            {this.state.rpayBalance[data.id] ?
              Helper.num.formatDecimal(this.state.rpayBalance[data.id])
              : '0'}
          </CCardBody>
        </CCard>

      )
    })
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
          <tr key={'rpayRecordData-' + data.id} onClick={this.handleEdit.bind(this, data)}>
            <td>{data.id}</td>
            <td>({data.regularPayId}){this.state.rpayMap[data.regularPayId].title}</td>
            <td>{Helper.date.dateFormat(new Date(data.wdate))}</td>
            <td>{data.title}</td>
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
            <CCardGroup className="mb-4">
              {this.state.selectedRpay ?
                <CCard
                  color='default'>
                  <CCardHeader align="center" className="p-1 small">
                    <CLink
                      className='text-muted' onClick={this.handleCardSelect.bind(this, null)}>모든 정기납입 보기</CLink>
                  </CCardHeader>
                </CCard>
                : ''
              }
              {this.renderCardList(this.props.storeRpays)}
            </CCardGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Search</strong>
                <small> Regular Record</small>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CForm onSubmit={this.handleSearchGo} id="frmRefSearch">
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>Keyword</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" name="keyword" placeholder="Enter the search keyword" />
                        <CInputGroupAppend>
                          <CButton type="submit" color="primary">Search</CButton>
                        </CInputGroupAppend>
                        {this.state.keyword !== "" &&
                          <CInputGroupAppend>
                            <CButton type="reset" color="success" onClick={this.handleViewAll}>전체보기</CButton>
                          </CInputGroupAppend>
                        }
                      </CInputGroup>
                      <small id="keywordError" className="text-danger">{this.state.keywordError}</small>
                    </CForm>
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
                <strong>Regular Record List</strong>
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
        <RegularRecordAdd key={"RegularRecordAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <RegularRecordEdit key={"RegularRecordEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />

      </>

    );
  }
}

const mapStateToProps = (state) => ({
  storeDataSync: state.rpay.dataSync,
  storeRpays: state.rpay.rpays,
});

const mapDispatchToProps = (dispatch) => ({
  rpayFetch: () => dispatch(AllActions.rpay.rpayFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegularRecord);
