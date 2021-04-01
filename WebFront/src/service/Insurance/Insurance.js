import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import {
  CCard, CCardBody, CCardHeader, CCol, CRow,
  CLink, CCollapse, CListGroup, CListGroupItem, CBadge
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import InsuranceAdd from './InsuranceAdd.js';
import InsuranceEdit from './InsuranceEdit.js';
import AllActions from '../../actions'
import Helper from '../../helpers'

class Insurance extends Component {
  constructor(props) {
    super(props);

    this.dataChangedCallback = this.dataChangedCallback.bind(this);
    this.renderTableList = this.renderTableList.bind(this);
    this.genEmptyObj = this.genEmptyObj.bind(this);

    this.modalToggleAdd = this.modalToggleAdd.bind(this);
    this.modalToggleEdit = this.modalToggleEdit.bind(this);

    this.handleViewAll = this.handleViewAll.bind(this);
    this.handleSearchGo = this.handleSearchGo.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      emptyId: -1,
      dataSet: props.storeInsures,
      currentData: {
        id: -1,
        company: '',
        product: '',
        insuranceType: '',
        policyType: '',
        contractId: '',
        policyHolder: '',
        insured: '',
        payCountTotal: '',
        payCountDone: '',
        premiumVolume: '',
        premiumMode: '',
        arranger: '',
        contractStatus: '',
        contractDate: '',
        maturityDate: '',
        memo: '',
      },
      totalCount: props.storeInsures.length,
      keyword: "",
      keywordError: "",
      modalFlagAdd: false,
      modalFlagEdit: false,

    };
  }

  dataChangedCallback(modifiedData) {
    console.log("Insurance::dataChangedCallback");
    if (modifiedData !== undefined && modifiedData !== null) {
      for (var i = 0; i < this.state.dataSet.length; i++) {
        if (this.state.dataSet[i].id === modifiedData.id) {
          var newDataSet = update(this.state.dataSet, { $splice: [[i, 1, modifiedData]] });
          this.props.cardFetchOk(newDataSet);
          break;
        }
      }
    } else {
      this.requestFetch(this.state.keyword);
    }
  }

  requestFetch() {
    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/card' : '/pds/v1/card';

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
      console.log("Insurance::fetch => " + resJson.result);

      parentState.props.cardFetchOk(resJson.data);
      parentState.setState({
        keywordError: '',
      });
    }).catch(function (error) {
      console.log("Insurance::fetch => " + error);
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
      product: '',
      insuranceType: '',
      policyType: '',
      contractId: '',
      policyHolder: '',
      insured: '',
      payCountTotal: '',
      payCountDone: '',
      premiumVolume: '',
      premiumMode: '',
      arranger: '',
      contractStatus: '',
      contractDate: '',
      maturityDate: '',
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

  renderTableList(dataArray) {
    if (dataArray.length === 0) {
      return (
        <CCol sm="12" xl="6">
          <CCard key={'insurance-none'}>
            <CCardHeader>
              Card actions
            <div className="card-header-actions">
                <CLink className="card-header-action">
                  <CIcon name="cil-settings" />
                </CLink>
                <CLink className="card-header-action">
                  <CIcon name={'cil-chevron-bottom'} />
                </CLink>
                <CLink className="card-header-action">
                  <CIcon content={freeSet.cilTrash} size="sm" />&nbsp;삭제</CLink>
              </div>
            </CCardHeader>
            <CCollapse>
              <CCardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </CCardBody>
            </CCollapse>
          </CCard>
        </CCol>
      )
    } else {
      return dataArray.map((data, index) => {
        return (
          <CCol key={'insurance-' + data.id} sm="12" xl="6">
            <CCard accentColor="info">
              <CCardHeader>
                <strong>{data.company + '-' + data.product}</strong>
                <div className="card-header-actions">
                  <CLink className="card-header-action" onClick={this.handleEdit.bind(this, data)}>
                    <CIcon name={'cil-pencil'} />
                  </CLink>
                  <CLink className="card-header-action" onClick={this.handleEdit.bind(this, data)}>
                    <CIcon content={freeSet.cilTrash} size="sm" /></CLink>
                </div>
              </CCardHeader>
              <CCollapse show={true}>
                <CCardBody className="p-2">
                  <CRow>
                    <CCol className="pr-2">
                      <CListGroup>
                        <CListGroupItem className="p-1"><CBadge>보험종류</CBadge> {data.insuranceType}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>정책형태</CBadge> {data.policyType}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>계약번호</CBadge> {data.contractId}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>보험소유</CBadge> {data.policyHolder}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>피보험자</CBadge> {data.insured}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>총납입수</CBadge> {data.payCountTotal}</CListGroupItem>
                      </CListGroup>
                    </CCol>
                    <CCol className='pl-0'>
                      <CListGroup>
                        <CListGroupItem className="p-1"><CBadge>납입회차</CBadge> {data.payCountDone}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>납입금액</CBadge> {Helper.num.formatDecimal(data.premiumVolume)} 원</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>납입주기</CBadge> {data.premiumMode}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>계약상태</CBadge> {(data.contractStatus === 1) ? '유지' : '해지'}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>계약일자</CBadge> {Helper.date.dateFormat(new Date(data.contractDate))}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>만료일자</CBadge> {Helper.date.dateFormat(new Date(data.maturityDate))}</CListGroupItem>
                      </CListGroup>
                    </CCol>
                  </CRow>
                  <CRow className="mt-2">
                    <CCol>
                      <CListGroup>
                        <CListGroupItem className="p-1"><CBadge>담당</CBadge> {data.arranger}</CListGroupItem>
                        <CListGroupItem className="p-1"><CBadge>메모</CBadge> {data.memo}</CListGroupItem>
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
          {this.renderTableList(this.props.storeInsures)}
        </CRow>
        <InsuranceAdd modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <InsuranceEdit modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />

      </>

    );
  }
}

const mapStateToProps = (state) => ({
  storeDataSync: state.insure.dataSync,
  storeInsures: state.insure.insures,
});

const mapDispatchToProps = (dispatch) => ({
  insureFetchOk: (data) => dispatch(AllActions.insure.insureFetchOk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
