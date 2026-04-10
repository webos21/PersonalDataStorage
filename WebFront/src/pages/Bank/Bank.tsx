import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import BankAdd from './BankAdd';
import BankEdit from './BankEdit';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyId: -1,
      dataSet: props.storeBanks,
      currentData: {
        id: -1,
        bankName: '',
        accountName: '',
        holder: '',
        accountNumber: '',
        initialBalance: '',
        accountPassword: '',
        issueDate: '',
        expireDate: '',
        arrange: '',
        notUsed: '',
        memo: '',
      },
      keyword: "",
      keywordError: "",
      modalFlagAdd: false,
      modalFlagEdit: false,
    };
  }

  dataChangedCallback(modifiedData) {
    if (modifiedData) {
      for (var i = 0; i < this.state.dataSet.length; i++) {
        if (this.state.dataSet[i].id === modifiedData.id) {
          var newDataSet = update(this.state.dataSet, { $splice: [[i, 1, modifiedData]] });
          this.props.bankFetchOk(newDataSet);
          break;
        }
      }
    } else {
      this.requestFetch(this.state.keyword);
    }
  }

  requestFetch() {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/bank' : '/pds/v1/bank';
    fetch(REQ_URI, { method: 'GET', headers: Utils.auth.makeAuthHeader(), })
      .then(res => res.json())
      .then(resJson => {
        this.props.bankFetchOk(resJson.data);
        this.setState({ keywordError: '' });
      }).catch(error => this.setState({ keywordError: error.message }));
  }

  componentDidMount() {
    if (!this.props.storeDataSync) this.requestFetch();
  }

  genEmptyObj() {
    let newId = this.state.emptyId - 1;
    this.setState({ emptyId: newId });
    return { id: newId, bankName: '', accountName: '', holder: '', accountNumber: '', initialBalance: '', accountPassword: '', issueDate: '', expireDate: '', arrange: '', notUsed: '', memo: '' };
  }

  modalToggleAdd = () => this.setState({ currentData: this.genEmptyObj(), modalFlagAdd: !this.state.modalFlagAdd });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  handleViewAll = () => { this.setState({ keyword: "" }); document.getElementById("frmRefSearch").reset(); }
  handleSearchGo = (e) => { e.preventDefault(); this.setState({ keyword: e.target.keyword.value }); }
  handleAdd = (e) => { e.preventDefault(); this.modalToggleAdd(); }
  handleEdit = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleEdit(); }

  renderTableList(dataArray) {
    const filteredData = (this.state.keyword ? dataArray.filter(i => Object.keys(i).some(k => i[k]?.toString().includes(this.state.keyword))) : dataArray);
    return filteredData.length === 0 ? <tr><td colSpan="5" className="p-4 text-center">No Data</td></tr> :
      filteredData.map(data => (
        <tr key={data.id} onClick={(e) => this.handleEdit(data, e)} className="hover:bg-gray-50 cursor-pointer border-b">
          <td className="p-2 border">{data.id}</td>
          <td className="p-2 border">{data.bankName}</td>
          <td className="p-2 border">{data.accountName}</td>
          <td className="p-2 border">{data.accountNumber}</td>
          <td className="p-2 border">{data.notUsed === 1 ? '미사용' : '사용중'}</td>
        </tr>
      ));
  }

  render() {
    return (
      <div className="space-y-6">
        <div className="bg-white p-4 shadow rounded">
          <div className="font-bold text-lg mb-2">Search <small className="text-gray-500">Bank</small></div>
          <form onSubmit={this.handleSearchGo} id="frmRefSearch" className="flex gap-2">
            <input type="text" name="keyword" placeholder="Enter keyword" className="border p-2 flex-grow rounded" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
            {this.state.keyword !== "" && <button type="reset" onClick={this.handleViewAll} className="px-4 py-2 bg-green-600 text-white rounded">전체보기</button>}
          </form>
          {this.state.keywordError && <p className="text-red-500 text-sm mt-2">{this.state.keywordError}</p>}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Bank List <small className="text-gray-500">(Total: {this.props.storeBanks.length})</small></h2>
            <button onClick={this.handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr><th className="p-2 border">ID</th><th className="p-2 border">은행명</th><th className="p-2 border">계좌명</th><th className="p-2 border">계좌번호</th><th className="p-2 border">사용여부</th></tr>
            </thead>
            <tbody>{this.renderTableList(this.props.storeBanks)}</tbody>
          </table>
        </div>
        <BankAdd key={"BankAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <BankEdit key={"BankEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.bank.dataSync, storeBanks: state.bank.banks });
const mapDispatchToProps = (dispatch) => ({ bankFetchOk: (data) => dispatch(AllActions.bank.bankFetchOk(data)) });
export default connect(mapStateToProps, mapDispatchToProps)(Bank);