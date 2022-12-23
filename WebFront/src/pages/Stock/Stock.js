import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
  CLink, CCollapse, CListGroup, CListGroupItem, CBadge,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import StockAdd from './StockAdd.js';
import StockEdit from './StockEdit.js';
import StockDel from './StockDel.js';
import AllActions from '../../actions'
import Helper from '../../helpers'

class Stock extends Component {
  constructor(props) {
    super(props);

    this.dataChangedCallback = this.dataChangedCallback.bind(this);
    this.renderTableList = this.renderTableList.bind(this);
    this.genEmptyObj = this.genEmptyObj.bind(this);

    this.modalToggleAdd = this.modalToggleAdd.bind(this);
    this.modalToggleEdit = this.modalToggleEdit.bind(this);
    this.modalToggleDel = this.modalToggleDel.bind(this);

    this.handleViewAll = this.handleViewAll.bind(this);
    this.handleSearchGo = this.handleSearchGo.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDel = this.handleDel.bind(this);

    this.state = {
      emptyId: -1,
      dataSet: props.storeStocks,
      currentData: {
        id: -1,
        company: '',
        accountName: '',
        accountNumber: '',
        holder: '',
        deposit: '',
        estimate: '',
        estimateDate: '',
        arrange: '',
        memo: '',
      },
      totalCount: props.storeStocks.length,
      keyword: "",
      keywordError: "",
      modalFlagAdd: false,
      modalFlagEdit: false,
      modalFlagDel: false,

    };
  }

  dataChangedCallback(modifiedData) {
    console.log("Card::dataChangedCallback");
    if (modifiedData !== undefined && modifiedData !== null) {
      for (var i = 0; i < this.state.dataSet.length; i++) {
        if (this.state.dataSet[i].id === modifiedData.id) {
          var newDataSet = update(this.state.dataSet, { $splice: [[i, 1, modifiedData]] });
          this.props.stockFetchOk(newDataSet);
          break;
        }
      }
    } else {
      this.requestFetch(this.state.keyword);
    }
  }

  requestFetch() {
    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/stock' : '/pds/v1/stock';

    fetch(REQ_URI, {
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
      console.log("Stock::fetch => " + resJson.result);

      parentState.props.stockFetchOk(resJson.data);
      parentState.setState({
        keywordError: '',
      });
    }).catch(function (error) {
      console.log("Stock::fetch => " + error);
      parentState.setState({ keywordError: error.message })
    });
  }

  componentDidMount() {
    if (!this.props.storeDataSync) {
      this.requestFetch();
    }
  }

  genEmptyObj() {
    let newEmptyId = (this.state.emptyId ? (this.state.emptyId - 1) : -1);
    let emptyObj = {
      id: newEmptyId,
      company: '',
      accountName: '',
      accountNumber: '',
      holder: '',
      deposit: '',
      estimate: '',
      estimateDate: '',
      arrange: '',
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

  modalToggleDel() {
    this.setState({
      modalFlagDel: !this.state.modalFlagDel,
    });
  }

  handleViewAll() {
    this.setState({ keyword: "" });
    document.getElementById("frmRefSearch").reset();
  }

  handleSearchGo(event) {
    event.preventDefault();
    this.setState({ keyword: event.target.keyword.value });
  }

  handleAdd(e) {
    e.preventDefault();
    let newObj = this.genEmptyObj();
    this.setState({ currentData: newObj });
    this.modalToggleAdd();
  }

  handleEdit(data, e) {
    e.preventDefault();
    console.log("handleEdit", e, data);
    this.setState({ currentData: data });
    this.modalToggleEdit();
  }

  handleDel(data, e) {
    e.preventDefault();
    console.log("handleDel", e, data);
    this.setState({ currentData: data });
    this.modalToggleDel();
  }

  renderTableList(dataArray) {
    if (dataArray.length === 0) {
      return (
        <CCol>
          <CCard key={'realestate-none'} color="gradient-secondary">
            <CCardBody className="text-center">
              No Data
            </CCardBody>
          </CCard>
        </CCol>
      )
    } else {
      return dataArray.map((data, index) => {
        return (
          <CCol key={'realestate-' + data.id} sm="12" xl="6">
            <CCard accentColor="info">
              <CCardHeader>
                <strong>[{data.company}] {data.accountName}</strong>
                <div className="card-header-actions">
                  <CLink className="card-header-action" onClick={this.handleEdit.bind(this, data)}>
                    <CIcon name={'cil-pencil'} />
                  </CLink>
                  <CLink className="card-header-action" onClick={this.handleDel.bind(this, data)}>
                    <CIcon content={freeSet.cilTrash} size="sm" /></CLink>
                </div>
              </CCardHeader>
              <CCollapse show={true}>
                <CCardBody className="p-2">
                  <CRow>
                    <CCol className="pr-2">
                      <CListGroup>
                        <CListGroupItem className="p-1"><CBadge>계좌번호</CBadge> {data.accountNumber}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>소유자명</CBadge> {data.holder}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>예탁금액</CBadge> {Helper.num.formatDecimal(data.deposit)} 원</CListGroupItem>
                      </CListGroup>
                    </CCol>
                    <CCol className='pl-0'>
                      <CListGroup>
                        <CListGroupItem className="p-1"><CBadge>산정금액</CBadge> {Helper.num.formatDecimal(data.estimate)} 원</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>산정일자</CBadge> {Helper.date.dateFormat(new Date(data.estimateDate))}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>정렬순서</CBadge> {data.arrange}</CListGroupItem>
                      </CListGroup>
                    </CCol>
                  </CRow>
                  <CRow className="mt-2">
                    <CCol>
                      <CListGroup>
                        <CListGroupItem className="p-1"><CBadge>메모</CBadge> <pre className="mb-0">{data.memo}</pre></CListGroupItem>
                      </CListGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CCol>
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
              <CCardBody>
                <strong>Stock List</strong>
                <small>  (Total : {this.props.storeStocks.length})</small>
                <span className="float-right">
                  <CButton color="success" size="sm" variant="ghost" onClick={this.handleAdd}>
                    <CIcon content={freeSet.cilPlus} size="sm" />&nbsp;추가</CButton>
                </span>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          {this.renderTableList(this.props.storeStocks)}
        </CRow>
        <StockAdd key={"StockAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <StockEdit key={"StockEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <StockDel key={"StockDel-" + this.state.currentData.id} modalFlag={this.state.modalFlagDel} modalToggle={this.modalToggleDel} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />

      </>

    );
  }
}

const mapStateToProps = (state) => ({
  storeDataSync: state.stock.dataSync,
  storeStocks: AllActions.stock.getStocks(state),
});

const mapDispatchToProps = (dispatch) => ({
  stockFetchOk: (data) => dispatch(AllActions.stock.stockFetchOk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
