import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import Pager from '../../components/Pager/Pager';
import RegularRecordAdd from './RegularRecordAdd';
import RegularRecordEdit from './RegularRecordEdit';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

class RegularRecord extends Component {
  constructor(props) {
    super(props);
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
      rpayMap: {},
      rpayBalance: {},
      selectedRpay: null,
      totalCount: 0,
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
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/regularRecord' : '/pds/v1/regularRecord';
    const reqUri = REQ_URI + ((query === null || query === undefined) ? '' : '?q=' + query);

    fetch(reqUri, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => {
        let sortedData = [].concat(resJson.data).sort((a, b) => a.wdate > b.wdate ? -1 : 1);
        let calcBalance = {};
        sortedData.forEach(data => {
          if (!calcBalance[data.regularPayId]) calcBalance[data.regularPayId] = 0;
          calcBalance[data.regularPayId] += (data.deposit - data.withdrawal);
        });
        this.setState({ dataSet: sortedData, rpayBalance: calcBalance, totalCount: sortedData.length, keywordError: '' });
      }).catch(error => this.setState({ keywordError: error.message }));
  }

  componentDidMount() {
    if (!this.props.storeDataSync) this.props.rpayFetch();
    let rmap = this.props.storeRpays.reduce((map, obj) => { map[obj.id] = obj; return map; }, {});
    this.setState({ rpayMap: rmap });
    this.requestFetch();
  }

  modalToggleAdd = () => this.setState({ currentData: this.genEmptyObj(), modalFlagAdd: !this.state.modalFlagAdd });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  handleViewAll = () => { this.setState({ keyword: "" }); document.getElementById("frmRefSearch").reset(); }
  handleSearchGo = (e) => { e.preventDefault(); this.setState({ keyword: e.target.keyword.value }); this.requestFetch(e.target.keyword.value); }
  handlePageChanged = (newPage) => this.requestFetch(this.state.keyword, newPage);
  handleAdd = (e) => { e.preventDefault(); this.modalToggleAdd(); }
  handleEdit = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleEdit(); }
  handleRpaySelect = (dataId) => this.setState({ selectedRpay: dataId });

  genEmptyObj() {
    let newId = this.state.emptyId - 1;
    this.setState({ emptyId: newId });
    return { id: newId, regularPayId: -1, wdate: new Date(), title: '', deposit: 0, withdrawal: 0, accountCode: '', memo: '' };
  }

  renderRpayList(dataArray) {
    return dataArray.map((data, index) => (data.notUsed === 1) ? null : (
        <button key={"rpay-" + data.id} onClick={() => this.handleRpaySelect(data.id)} className={`p-2 border rounded shadow-sm w-full ${this.state.selectedRpay === data.id ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}>
            <div className="font-semibold">{data.title}</div>
            <div className={`text-right font-bold ${this.state.rpayBalance[data.id] < 0 ? 'text-blue-600' : 'text-black'}`}>
                {Utils.num.formatDecimal(this.state.rpayBalance[data.id] || 0)}
            </div>
        </button>
    ));
  }

  renderTableList(dataArray) {
    const filteredData = dataArray.filter(data => !this.state.selectedRpay || data.regularPayId === this.state.selectedRpay);
    return filteredData.length === 0 ? <tr><td colSpan="7" className="p-4 text-center">No Data</td></tr> :
      filteredData.map(data => (
        <tr key={'rpayRecordData-' + data.id} onClick={(e) => this.handleEdit(data, e)} className="hover:bg-gray-50 cursor-pointer border-b">
          <td className="p-2 border">{data.id}</td>
          <td className="p-2 border">({data.regularPayId}){this.state.rpayMap[data.regularPayId]?.title}</td>
          <td className="p-2 border">{Utils.date.dateFormat(new Date(data.wdate))}</td>
          <td className="p-2 border">{data.title}</td>
          <td className="p-2 border text-right">{Utils.num.formatDecimal(data.deposit)}</td>
          <td className="p-2 border text-right text-blue-600">{Utils.num.formatDecimal(data.withdrawal)}</td>
          <td className="p-2 border truncate max-w-[140px]">{data.memo}</td>
        </tr>
      ));
  }

  render() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {this.state.selectedRpay && <button onClick={() => this.handleRpaySelect(null)} className="p-2 border rounded bg-gray-100">모든 정기납입 보기</button>}
          {this.renderRpayList(this.props.storeRpays)}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="font-bold text-lg mb-2">Search <small className="text-gray-500">Regular Record</small></div>
          <form onSubmit={this.handleSearchGo} id="frmRefSearch" className="flex gap-2">
            <input type="text" name="keyword" placeholder="Enter keyword" className="border p-2 flex-grow rounded" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
            {this.state.keyword !== "" && <button type="reset" onClick={this.handleViewAll} className="px-4 py-2 bg-green-600 text-white rounded">전체보기</button>}
          </form>
          {this.state.keywordError && <p className="text-red-500 text-sm mt-2">{this.state.keywordError}</p>}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Regular Record List <small className="text-gray-500">(Total: {this.state.totalCount})</small></h2>
            <button onClick={this.handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr><th className="p-2 border">ID</th><th className="p-2 border">정기납명</th><th className="p-2 border">거래일</th><th className="p-2 border">적요</th><th className="p-2 border">입금액</th><th className="p-2 border">출금액</th><th className="p-2 border">메모</th></tr>
            </thead>
            <tbody>{this.renderTableList(this.state.dataSet)}</tbody>
          </table>
          <Pager total={this.state.totalPage} current={this.state.currentPage} visiblePages={5} onPageChanged={this.handlePageChanged} />
        </div>
        <RegularRecordAdd key={"RegularRecordAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <RegularRecordEdit key={"RegularRecordEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.rpay.dataSync, storeRpays: state.rpay.rpays });
const mapDispatchToProps = (dispatch) => ({ rpayFetch: () => dispatch(AllActions.rpay.rpayFetch()) });
export default connect(mapStateToProps, mapDispatchToProps)(RegularRecord);