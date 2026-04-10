import React, { Component } from 'react';
import update from 'immutability-helper';

import Pager from '../../components/Pager/Pager';
import AbFormAdd from './AbFormAdd';
import AbFormEdit from './AbFormEdit';
import Utils from '../../utils/index'

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyId: -1,
      dataSet: [],
      currentData: { id: -1, fullName: '', mobile: '', category: '', telephone: '', fax: '', email: '', homepage: '', postcode: '', address: '', memo: '' },
      totalCount: 0,
      itemsPerPage: 10,
      totalPage: 0,
      currentPage: 0,
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
          this.setState({ dataSet: newDataSet });
          break;
        }
      }
    } else {
      this.requestFetch(this.state.keyword);
    }
  }

  requestFetch(query, page) {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/address' : '/pds/v1/address';
    const reqUri = REQ_URI + '?perPage=' + this.state.itemsPerPage + '&page=' + ((page === null || page === undefined) ? 1 : page) + ((query === null || query === undefined) ? '' : '&q=' + query);

    fetch(reqUri, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          dataSet: resJson.data,
          totalCount: resJson.pagination.totalCount,
          currentPage: (resJson.pagination.currentPage - 1),
          totalPage: Math.ceil(resJson.pagination.totalCount / this.state.itemsPerPage),
          keywordError: '',
        });
      }).catch(error => this.setState({ keywordError: error.message }));
  }

  componentDidMount() { this.requestFetch(); }

  modalToggleAdd = () => this.setState({ modalFlagAdd: !this.state.modalFlagAdd, currentData: this.genEmptyObj() });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  handleAdd = (e) => { e.preventDefault(); this.modalToggleAdd(); }
  handleEdit = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleEdit(); }
  handleSearchGo = (e) => { e.preventDefault(); this.setState({ keyword: e.target.keyword.value }); this.requestFetch(e.target.keyword.value); }
  handleViewAll = () => { this.setState({ keyword: "" }); this.requestFetch(""); document.getElementById("frmRefSearch").reset(); }
  handlePageChanged = (newPage) => this.requestFetch(this.state.keyword, newPage);

  genEmptyObj() {
    let newId = this.state.emptyId - 1;
    this.setState({ emptyId: newId });
    return { id: newId, fullName: '', mobile: '', category: '', telephone: '', fax: '', email: '', homepage: '', postcode: '', address: '', memo: '' };
  }

  render() {
    return (
      <div className="space-y-6">
        <div className="bg-white p-4 shadow rounded">
          <div className="font-bold text-lg mb-2">Search <small className="text-gray-500">Address</small></div>
          <form onSubmit={this.handleSearchGo} id="frmRefSearch" className="flex gap-2">
            <input type="text" name="keyword" placeholder="Enter keyword" className="border p-2 flex-grow rounded" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
            {this.state.keyword !== "" && <button type="reset" onClick={this.handleViewAll} className="px-4 py-2 bg-green-600 text-white rounded">전체보기</button>}
          </form>
          {this.state.keywordError && <p className="text-red-500 text-sm mt-2">{this.state.keywordError}</p>}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Address List <small className="text-gray-500">(Total: {this.state.totalCount})</small></h2>
            <button onClick={this.modalToggleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr><th className="p-2 border">ID</th><th className="p-2 border">이름</th><th className="p-2 border">분류</th><th className="p-2 border">핸드폰</th></tr>
            </thead>
            <tbody>
              {this.state.dataSet.length === 0 ? <tr><td colSpan="4" className="p-4 text-center">No Data</td></tr> :
                this.state.dataSet.map(data => (
                  <tr key={data.id} onClick={(e) => this.handleEdit(data, e)} className="hover:bg-gray-50 cursor-pointer border-b">
                    <td className="p-2 text-center border">{data.id}</td>
                    <td className="p-2 text-center border">{data.fullName}</td>
                    <td className="p-2 text-center border">{data.category}</td>
                    <td className="p-2 text-center border">{data.mobile}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pager total={this.state.totalPage} current={this.state.currentPage} visiblePages={5} onPageChanged={this.handlePageChanged} />
        </div>
        <AbFormAdd key={"AbFormAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <AbFormEdit key={"AbFormEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

export default AddressBook;
