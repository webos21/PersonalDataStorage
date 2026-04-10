import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import RealEstateRecordAdd from './RealEstateRecordAdd';
import RealEstateRecordEdit from './RealEstateRecordEdit';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

class RealEstateRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyId: -1,
      dataSet: [],
      currentData: {
        id: -1,
        realEstateId: -1,
        transactionDate: new Date(),
        title: '',
        deposit: 0,
        withdrawal: 0,
        memo: '',
      },
      restateMap: [],
      restateBalance: {},
      selectedRestate: null,
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
      this.requestFetch();
    }
  }

  requestFetch(query) {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/realestateRecord' : '/pds/v1/realestateRecord';
    const reqUri = REQ_URI + ((query === null || query === undefined) ? '' : '?q=' + query);

    fetch(reqUri, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => {
        let sortedData = [].concat(resJson.data).sort((a, b) => a.transactionDate > b.transactionDate ? -1 : 1);
        let calcBalance = {};
        sortedData.forEach(data => {
          if (!calcBalance[data.realEstateId]) calcBalance[data.realEstateId] = 0;
          calcBalance[data.realEstateId] += (data.deposit - data.withdrawal);
        });
        this.setState({ dataSet: sortedData, restateBalance: calcBalance, totalCount: sortedData.length, keywordError: '' });
      }).catch(error => this.setState({ keywordError: error.message }));
  }

  componentDidMount() {
    if (!this.props.storeDataSync) this.props.restateFetch();
    let cmap = this.props.storeRestates.reduce((map, obj) => { map[obj.id] = obj; return map; }, {});
    this.setState({ restateMap: cmap });
    this.requestFetch();
  }

  modalToggleAdd = () => this.setState({ currentData: this.genEmptyObj(), modalFlagAdd: !this.state.modalFlagAdd });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  handleViewAll = () => { this.setState({ keyword: "" }); document.getElementById("frmRefSearch").reset(); }
  handleSearchGo = (e) => { e.preventDefault(); this.setState({ keyword: e.target.keyword.value }); this.requestFetch(e.target.keyword.value); }
  handleAdd = (e) => { e.preventDefault(); this.modalToggleAdd(); }
  handleEdit = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleEdit(); }
  handleRestateSelect = (dataId) => this.setState({ selectedRestate: dataId });

  genEmptyObj() {
    let newId = this.state.emptyId - 1;
    this.setState({ emptyId: newId });
    return { id: newId, realEstateId: -1, transactionDate: new Date(), title: '', deposit: 0, withdrawal: 0, memo: '' };
  }

  renderCardList(dataArray) {
    return dataArray.map(data => (data.notUsed === 1) ? null : (
        <button key={"restate-" + data.id} onClick={() => this.handleRestateSelect(data.id)} className={`p-2 border rounded shadow-sm w-full ${this.state.selectedRestate === data.id ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}>
            <div className="font-semibold">{data.estateType} - {data.title}</div>
            <div className={`text-right font-bold ${this.state.restateBalance[data.id] < 0 ? 'text-blue-600' : 'text-black'}`}>
                {Utils.num.formatDecimal(this.state.restateBalance[data.id] || 0)}
            </div>
        </button>
    ));
  }

  renderTableList(dataArray) {
    const filteredData = dataArray.filter(data => !this.state.selectedRestate || data.realEstateId === this.state.selectedRestate);
    return filteredData.length === 0 ? <tr><td colSpan="7" className="p-4 text-center">No Data</td></tr> :
      filteredData.map(data => (
        <tr key={'restateRecordData-' + data.id} onClick={(e) => this.handleEdit(data, e)} className="hover:bg-gray-50 cursor-pointer border-b">
          <td className="p-2 border">{data.id}</td>
          <td className="p-2 border">[{this.state.restateMap[data.realEstateId]?.estateType}] {this.state.restateMap[data.realEstateId]?.title}</td>
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
          {this.state.selectedRestate && <button onClick={() => this.handleRestateSelect(null)} className="p-2 border rounded bg-gray-100">모든 부동산 보기</button>}
          {this.renderCardList(this.props.storeRestates)}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="font-bold text-lg mb-2">Search <small className="text-gray-500">RealEstate Record</small></div>
          <form onSubmit={this.handleSearchGo} id="frmRefSearch" className="flex gap-2">
            <input type="text" name="keyword" placeholder="Enter keyword" className="border p-2 flex-grow rounded" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
            {this.state.keyword !== "" && <button type="reset" onClick={this.handleViewAll} className="px-4 py-2 bg-green-600 text-white rounded">전체보기</button>}
          </form>
          {this.state.keywordError && <p className="text-red-500 text-sm mt-2">{this.state.keywordError}</p>}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">RealEstate Record List <small className="text-gray-500">(Total: {this.state.totalCount})</small></h2>
            <button onClick={this.handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr><th className="p-2 border">ID</th><th className="p-2 border">부동산명</th><th className="p-2 border">거래일</th><th className="p-2 border">적요</th><th className="p-2 border">입금액</th><th className="p-2 border">출금액</th><th className="p-2 border">메모</th></tr>
            </thead>
            <tbody>{this.renderTableList(this.state.dataSet)}</tbody>
          </table>
        </div>
        <RealEstateRecordAdd key={"RealEstateRecordAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <RealEstateRecordEdit key={"RealEstateRecordEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.restate.dataSync, storeRestates: state.restate.restates });
const mapDispatchToProps = (dispatch) => ({ restateFetch: () => dispatch(AllActions.restate.restateFetch()) });
export default connect(mapStateToProps, mapDispatchToProps)(RealEstateRecord);