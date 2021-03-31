import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
  CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupAppend, CInputGroupText,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import CardAdd from './CardAdd.js';
import CardEdit from './CardEdit.js';
import AllActions from '../../actions'
import Helper from '../../helpers'

class Card extends Component {
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
      dataSet: props.storeCards,
      currentData: {
        id: -1,
        company: '',
        cardName: '',
        cardNumber: '',
        cardPassword: '',
        validYear: '',
        validMonth: '',
        chargeDate: '',
        cvcNumber: '',
        bankId: '',
        creditLimit: '',
        cashAdvance: '',
        cardLoan: '',
        issueDate: '',
        refreshNormal: '',
        refreshShort: '',
        arrange: '',
        memo: '',
      },
      totalCount: props.storeCards.length,
      keyword: "",
      keywordError: "",
      modalFlagAdd: false,
      modalFlagEdit: false,

    };
  }

  dataChangedCallback(modifiedData) {
    console.log("Card::dataChangedCallback");
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
      console.log("Card::fetch => " + resJson.result);

      parentState.props.cardFetchOk(resJson.data);
      parentState.setState({
        keywordError: '',
      });
    }).catch(function (error) {
      console.log("Card::fetch => " + error);
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
      cardName: '',
      cardNumber: '',
      cardPassword: '',
      validYear: '',
      validMonth: '',
      chargeDate: '',
      cvcNumber: '',
      bankId: '',
      creditLimit: '',
      cashAdvance: '',
      cardLoan: '',
      issueDate: '',
      refreshNormal: '',
      refreshShort: '',
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
    const filteredData = ((this.state.keyword && this.state.keyword.length > 0) ? dataArray.filter(
      item => {
        const lcKewword = this.state.keyword.toLowerCase();
        return Object.keys(item).some(key => (item[key].includes ? item[key].includes(lcKewword) : false));
      }
    ) : dataArray);
    if (filteredData.length === 0) {
      return (
        <tr key="row-nodata">
          <td colSpan="5" className="text-center align-middle" height="200">No Data</td>
        </tr>
      )
    } else {
      return filteredData.map((data, index) => {
        return (
          <tr key={'bankdata-' + data.id} onClick={this.handleEdit.bind(this, data)}>
            <td>{data.id}</td>
            <td>{data.company}</td>
            <td>{data.cardName}</td>
            <td>{data.cardNumber}</td>
            <td>{'매월 ' + (data.chargeDate + 1) + '일'}</td>
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
              <CCardHeader>
                <strong>Search</strong>
                <small> Card</small>
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
                <strong>Card List</strong>
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
                      <th>카드사</th>
                      <th>카드명</th>
                      <th>카드번호</th>
                      <th>결제일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableList(this.props.storeCards)}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CardAdd modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <CardEdit modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />

      </>

    );
  }
}

const mapStateToProps = (state) => ({
  storeDataSync: state.card.dataSync,
  storeCards: state.card.cards,
});

const mapDispatchToProps = (dispatch) => ({
  cardFetchOk: (data) => dispatch(AllActions.card.cardFetchOk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
