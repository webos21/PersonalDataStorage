import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Button, Card, CardContent, CardHeader, Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// redux
import AddIcon from '@mui/icons-material/Add';
//import DeleteIcon from '@mui/icons-material/Delete';
import { aclassSuccess, getAclasses } from '../../store/reducers/aclass';
//import { getAclassError, getAclassStatus } from '../../store/reducers/aclass';

// project import
import ComponentSkeleton from '../../components/ComponentSkeleton';
import AcodeSelector from '../../components/AcodeSelector';

import SearchBar from '../../components/SearchBar';

import Utils from '../../utils';


import AccountCodeAdd from './AccountCodeAdd.js';
import AccountCodeEdit from './AccountCodeEdit.js';

const AccountCode = () => {
  constructor(props) {
    super(props);

    this.dataChangedCallback = this.dataChangedCallback.bind(this);
    this.acodeSelectedCallback = this.acodeSelectedCallback.bind(this);

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
      dataSet: props.storeAcodes,
      currentData: {
        id: -1,
        accountCode: '',
        title: '',
      },
      totalCount: props.storeAcodes.length,
      keyword: "",
      keywordError: "",
      modalFlagAdd: false,
      modalFlagEdit: false,
      acodeSelected: '',
    };
  }

  dataChangedCallback(modifiedData) {
    console.log("AccountClass::dataChangedCallback");
    if (modifiedData !== undefined && modifiedData !== null) {
      for (var i = 0; i < this.state.dataSet.length; i++) {
        if (this.state.dataSet[i].id === modifiedData.id) {
          var newDataSet = update(this.state.dataSet, { $splice: [[i, 1, modifiedData]] });
          this.props.acodeFetchOk(newDataSet);
          break;
        }
      }
    } else {
      this.requestFetch();
    }
  }

  acodeSelectedCallback(codeObj) {
    console.log("AccountClass::acodeSelectedCallback", codeObj);
    let newVal = codeObj.codeNo + ` / ${codeObj.classTitle}(${codeObj.classId}) > ${codeObj.codeTitle}(${codeObj.codeNo})`;
    this.setState({
      acodeSelected: newVal
    })
  }

  requestFetch() {
    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/accountCode' : '/pds/v1/accountCode';

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
      console.log("AccountCode::fetch => " + resJson.result);

      parentState.props.acodeFetchOk(resJson.data);
      parentState.setState({
        keywordError: '',
      });
    }).catch(function (error) {
      console.log("AccountCode::fetch => " + error);
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
      accountCode: '',
      title: '',
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
          <td colSpan="4" className="text-center align-middle" height="200">No Data</td>
        </tr>
      )
    } else {
      return filteredData.map((data, index) => {
        return (
          <tr key={'memo-' + data.id} onClick={this.handleEdit.bind(this, data)}>
            <td>{data.id}</td>
            <td>{data.accountCode}</td>
            <td>{data.title}</td>
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
                <small> AccountCode</small>
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
                <strong>AccountCode List</strong>
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
                      <th>분류코드</th>
                      <th>코드명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableList(this.props.storeAcodes)}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <AccountCodeAdd key={"AccountCodeAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <AccountCodeEdit key={"AccountCodeEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />

        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Test</strong>
                <small> AccountCode</small>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>Selected Account Code</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" name="acode" placeholder="Selected Account Code" value={this.state.acodeSelected} onChange={this.acodeSelectedCallback} />
                      <CInputGroupAppend>
                        <AcodeSelector accountCodeSelected={this.acodeSelectedCallback} />
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

      </>

    );
  }
}

const mapStateToProps = (state) => ({
  storeDataSync: state.acode.dataSync,
  storeAcodes: state.acode.acodes,
});

const mapDispatchToProps = (dispatch) => ({
  acodeFetchOk: (data) => dispatch(AllActions.acode.acodeFetchOk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCode);
