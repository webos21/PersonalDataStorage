import React, { Component } from 'react';
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CDataTable,
  CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupAppend, CInputGroupText,
} from '@coreui/react';
import Pager from '../../components/Pager';
import PbFormAdd from './PbFormAdd.js';
import PbFormEdit from './PbFormEdit.js';
import PbFormDel from './PbFormDel.js';
import update from 'immutability-helper';
import Cookies from 'universal-cookie';

class PasswordBook extends Component {
  constructor(props) {
    super(props);

    this.dataChangedCallback = this.dataChangedCallback.bind(this);
    this.renderTableList = this.renderTableList.bind(this);

    this.handleViewAll = this.handleViewAll.bind(this);
    this.handleSearchGo = this.handleSearchGo.bind(this);
    this.handlePageChanged = this.handlePageChanged.bind(this);

    this.state = {
      dataSet: [],
      totalCount: 0,
      itemsPerPage: 10,
      totalPage: 0,
      currentPage: 0,
      visiblePages: 10,
      keyword: "",
      keywordError: "",
    };
  }

  dataChangedCallback(modifiedData) {
    console.log("PasswordBook::dataChangedCallback");
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
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/pwbook' : '/pds/v1/pwbook';

    const reqUri = REQ_URI + '?perPage=' + this.state.itemsPerPage +
      '&page=' + ((page === null || page === undefined) ? 1 : page) +
      ((query === null || query === undefined) ? '' : '&q=' + query);
    const cookies = new Cookies();

    fetch(reqUri, {
      method: 'GET',
      headers: new Headers({
        'X-PDS-AUTH': cookies.get("X-PDS-AUTH"),
        'Authorization': 'Basic ' + btoa('username:password'),
      })
    }).then(function (res) {
      if (!res.ok) {
        if (res.status === 401) {
          window.location = "/#/logout";
        }
        throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
      }
      return res.json();
    }).then(function (resJson) {
      console.log("PasswordBook::fetch => " + resJson.result);

      var dataLen = resJson.pagination.totalCount;
      var calcPages = Math.ceil(dataLen / parentState.state.itemsPerPage);

      parentState.setState({
        dataSet: resJson.data,
        totalCount: dataLen,
        currentPage: (resJson.pagination.currentPage - 1),
        totalPage: calcPages,
        keywordError: '',
      });
    }).catch(function (error) {
      console.log("PasswordBook::fetch => " + error);
      parentState.setState({ keywordError: error.message })
    });
  }

  componentDidMount() {
    this.requestFetch();
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

  renderTableList(dataArray) {
    if (dataArray.length === 0) {
      return (
        <tr key="row-nodata">
          <td colSpan="5" className="text-center align-middle" height="200">No Data</td>
        </tr>
      )
    } else {
      return dataArray.map((data, index) => {
        return (
          <tr key={'pbdata-' + data.id}>
            <td>{data.siteName}</td>
            <td>{data.siteType}</td>
            <td><a href={data.siteUrl} target="_blank" rel="noopener noreferrer">{data.siteUrl}</a></td>
            <td>{data.myId}</td>
            <td>
              <PbFormEdit dataFromParent={data} callbackFromParent={this.dataChangedCallback} />
              &nbsp;
              <PbFormDel dataFromParent={data} callbackFromParent={this.dataChangedCallback} />
            </td>
          </tr>
        )
      })
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Search</strong>
                <small> PasswordBook</small>
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
                <i className="fa fa-align-justify"></i> Password List (Total : {this.state.totalCount})
                <PbFormAdd callbackFromParent={this.dataChangedCallback} />
              </CCardHeader>
              <CCardBody>
                <CDataTable hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>이름</th>
                      <th>유형</th>
                      <th>항목 URL</th>
                      <th>ID</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableList(this.state.dataSet)}
                  </tbody>
                </CDataTable>
                <Pager
                  total={this.state.totalPage}
                  current={this.state.currentPage}
                  visiblePages={this.state.visiblePages}
                  titles={{ first: 'First', last: 'Last' }}
                  onPageChanged={this.handlePageChanged}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>

    );
  }
}

export default PasswordBook;
