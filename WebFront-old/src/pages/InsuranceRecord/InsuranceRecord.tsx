import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import InsuranceRecordAdd from './InsuranceRecordAdd';
import InsuranceRecordEdit from './InsuranceRecordEdit';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

class InsuranceRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyId: -1,
      dataSet: [],
      currentData: { id: -1, insuranceId: -1, transactionDate: new Date(), title: '', deposit: 0, withdrawal: 0, memo: '' },
      insureMap: [],
      insureBalance: {},
      selectedInsurance: null,
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

  requestFetch(query) {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insuranceRecord' : '/pds/v1/insuranceRecord';
    const reqUri = REQ_URI + ((query === null || query === undefined) ? '' : '?q=' + query);

    fetch(reqUri, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => {
        let sortedData = [].concat(resJson.data).sort((a, b) => a.transactionDate > b.transactionDate ? -1 : 1);
        let calcBalance = {};
        sortedData.forEach(data => {
            if (!calcBalance[data.insuranceId]) calcBalance[data.insuranceId] = 0;
            calcBalance[data.insuranceId] += (data.deposit - data.withdrawal);
        });
        this.setState({ dataSet: sortedData, insureBalance: calcBalance, totalCount: sortedData.length, keywordError: '' });
      }).catch(error => this.setState({ keywordError: error.message }));
  }

  componentDidMount() {
    if (!this.props.storeDataSync) this.props.insureFetch();
    let cmap = this.props.storeInsures.reduce((map, obj) => { map[obj.id] = obj; return map; }, {});
    this.setState({ insureMap: cmap });
    this.requestFetch();
  }

  modalToggleAdd = () => this.setState({ currentData: this.genEmptyObj(), modalFlagAdd: !this.state.modalFlagAdd });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  handleViewAll = () => { this.setState({ keyword: "" }); document.getElementById("frmRefSearch").reset(); }
  handleSearchGo = (e) => { e.preventDefault(); this.setState({ keyword: e.target.keyword.value }); this.requestFetch(e.target.keyword.value); }
  handleAdd = (e) => { e.preventDefault(); this.modalToggleAdd(); }
  handleEdit = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleEdit(); }
  handleInsuranceSelect = (dataId) => this.setState({ selectedInsurance: dataId });

  genEmptyObj() {
    let newId = this.state.emptyId - 1;
    this.setState({ emptyId: newId });
    return { id: newId, insuranceId: -1, transactionDate: new Date(), title: '', deposit: 0, withdrawal: 0, memo: '' };
  }

  renderInsuranceList(dataArray) {
    return dataArray.map(data => (data.notUsed === 1) ? null : (
        <button key={"insure-" + data.id} onClick={() => this.handleInsuranceSelect(data.id)} className={`p-2 border rounded shadow-sm w-full ${this.state.selectedInsurance === data.id ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}>
            <div className="font-semibold">{data.company} - {data.product}</div>
            <div className={`text-right font-bold ${this.state.insureBalance[data.id] < 0 ? 'text-blue-600' : 'text-black'}`}>
                {Utils.num.formatDecimal(this.state.insureBalance[data.id] || 0)}
            </div>
        </button>
    ));
  }

  renderTableList(dataArray) {
    const filteredData = dataArray.filter(data => !this.state.selectedInsurance || data.insuranceId === this.state.selectedInsurance);
    return filteredData.length === 0 ? <tr><td colSpan="7" className="p-4 text-center">No Data</td></tr> :
      filteredData.map(data => (
        <tr key={'insureRecordData-' + data.id} onClick={(e) => this.handleEdit(data, e)} className="hover:bg-gray-50 cursor-pointer border-b">
          <td className="p-2 border">{data.id}</td>
          <td className="p-2 border">[{this.state.insureMap[data.insuranceId]?.company}] {this.state.insureMap[data.insuranceId]?.product}</td>
          <td className="p-2 border">{Utils.date.dateFormat(new Date(data.transactionDate))}</td>
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
          {this.state.selectedInsurance && <button onClick={() => this.handleInsuranceSelect(null)} className="p-2 border rounded bg-gray-100">모든 보험 보기</button>}
          {this.renderInsuranceList(this.props.storeInsures)}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="font-bold text-lg mb-2">Search <small className="text-gray-500">Insurance Record</small></div>
          <form onSubmit={this.handleSearchGo} id="frmRefSearch" className="flex gap-2">
            <input type="text" name="keyword" placeholder="Enter keyword" className="border p-2 flex-grow rounded" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
            {this.state.keyword !== "" && <button type="reset" onClick={this.handleViewAll} className="px-4 py-2 bg-green-600 text-white rounded">전체보기</button>}
          </form>
          {this.state.keywordError && <p className="text-red-500 text-sm mt-2">{this.state.keywordError}</p>}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Insurance Record List <small className="text-gray-500">(Total: {this.state.totalCount})</small></h2>
            <button onClick={this.handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr><th className="p-2 border">ID</th><th className="p-2 border">보험명</th><th className="p-2 border">거래일</th><th className="p-2 border">적요</th><th className="p-2 border">입금액</th><th className="p-2 border">출금액</th><th className="p-2 border">메모</th></tr>
            </thead>
            <tbody>{this.renderTableList(this.state.dataSet)}</tbody>
          </table>
        </div>
        <InsuranceRecordAdd key={"InsuranceRecordAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <InsuranceRecordEdit key={"InsuranceRecordEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.insure.dataSync, storeInsures: state.insure.insures });
const mapDispatchToProps = (dispatch) => ({ insureFetch: () => dispatch(AllActions.insure.insureFetch()) });
export default connect(mapStateToProps, mapDispatchToProps)(InsuranceRecord);