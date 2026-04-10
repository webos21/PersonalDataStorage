import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import RecordAdd from './RecordAdd';
import RecordEdit from './RecordEdit';
import Pager from '../../components/Pager';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyId: -1,
      dataSet: [],
      currentData: { id: -1, wdate: new Date(), title: '', deposit: 0, withdrawal: 0, accountCode: '', memo: '' },
      classCodeMap: [],
      recordBalance: [],
      totalCount: 0,
      itemsPerPage: 10,
      totalPage: 0,
      currentPage: 0,
      currentYear: (new Date().getFullYear()),
      currentMonth: (new Date().getMonth() + 1),
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
      this.requestFetch(this.state.currentYear, this.state.currentMonth);
    }
  }

  requestFetch(year, month) {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/record' : '/pds/v1/record';
    const reqUri = REQ_URI + '?year=' + year + '&month=' + month;

    fetch(reqUri, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => {
        let sortedData = [].concat(resJson.data).sort((a, b) => a.wdate > b.wdate ? -1 : 1);
        let calcBalance = { deposit: 0, withdrawal: 0, sum: 0 };
        sortedData.forEach(data => {
            calcBalance['deposit'] += data.deposit;
            calcBalance['withdrawal'] += data.withdrawal;
            calcBalance['sum'] += (data.deposit - data.withdrawal);
        });
        this.setState({ dataSet: sortedData, recordBalance: calcBalance, totalCount: sortedData.length });
      }).catch(error => console.error(error));
  }

  componentDidMount() {
    if (this.props.storeDataSync) {
      let classMap = this.props.storeClasses.reduce((map, obj) => { map[obj.id] = obj; return map; }, {});
      let codeMap = this.props.storeCodes.reduce((map, obj) => {
        map[obj.accountCode] = { ...obj, classInfo: classMap[obj.accountCode.substring(0, 1)] };
        return map;
      }, {});
      this.setState({ classCodeMap: codeMap });
    }
    this.requestFetch(this.state.currentYear, this.state.currentMonth);
  }

  modalToggleAdd = () => this.setState({ currentData: this.genEmptyObj(), modalFlagAdd: !this.state.modalFlagAdd });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  handleYearMonth(year, month) {
    this.setState({ currentYear: year, currentMonth: month });
    this.requestFetch(year, month);
  }
  handleAdd = (e) => { e.preventDefault(); this.modalToggleAdd(); }
  handleEdit = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleEdit(); }

  genEmptyObj() {
    let newId = this.state.emptyId - 1;
    this.setState({ emptyId: newId });
    return { id: newId, wdate: new Date(this.state.currentYear, (this.state.currentMonth - 1), 1), title: '', deposit: 0, withdrawal: 0, accountCode: '', memo: '' };
  }

  renderTableList(dataArray) {
    if (!this.state.classCodeMap) return <tr><td colSpan="7" className="p-4 text-center">Loading...</td></tr>;
    return dataArray.length === 0 ? <tr><td colSpan="7" className="p-4 text-center">No Data</td></tr> :
      dataArray.map(data => (
        <tr key={'record-' + data.id} onClick={(e) => this.handleEdit(data, e)} className="hover:bg-gray-50 cursor-pointer border-b">
          <td className="p-2 border">{data.id}</td>
          <td className="p-2 border">{Utils.date.dateFormat(new Date(data.wdate))}</td>
          <td className="p-2 border">{data.title}</td>
          <td className="p-2 border">{this.state.classCodeMap[data.accountCode]?.classInfo.title + ` > ` + this.state.classCodeMap[data.accountCode]?.title}</td>
          <td className="p-2 border text-right">{Utils.num.formatDecimal(data.deposit)}</td>
          <td className="p-2 border text-right text-blue-600">{Utils.num.formatDecimal(data.withdrawal)}</td>
          <td className="p-2 border truncate max-w-[140px]">{data.memo}</td>
        </tr>
      ));
  }

  render() {
    return (
      <div className="space-y-6">
        <div className="bg-white p-4 shadow rounded flex items-center justify-center gap-4">
            <button onClick={() => this.handleYearMonth(this.state.currentYear - 1, this.state.currentMonth)} className="p-2 bg-gray-200 rounded">««</button>
            <button onClick={() => this.handleYearMonth(this.state.currentYear, this.state.currentMonth - 1)} className="p-2 bg-gray-200 rounded">«</button>
            <div className="font-bold text-xl">{this.state.currentYear}년 {this.state.currentMonth}월</div>
            <button onClick={() => this.handleYearMonth(this.state.currentYear, this.state.currentMonth + 1)} className="p-2 bg-gray-200 rounded">»</button>
            <button onClick={() => this.handleYearMonth(this.state.currentYear + 1, this.state.currentMonth)} className="p-2 bg-gray-200 rounded">»»</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow rounded text-center">
                <div className="text-gray-500 text-sm">총 수입금</div>
                <div className="font-bold">{Utils.num.formatDecimal(this.state.recordBalance.deposit)}원</div>
            </div>
            <div className="bg-white p-4 shadow rounded text-center">
                <div className="text-gray-500 text-sm">총 지출금</div>
                <div className="font-bold text-blue-600">{Utils.num.formatDecimal(this.state.recordBalance.withdrawal)}원</div>
            </div>
            <div className="bg-white p-4 shadow rounded text-center">
                <div className="text-gray-500 text-sm">합계</div>
                <div className={`font-bold ${this.state.recordBalance.sum < 0 ? 'text-blue-600' : ''}`}>{Utils.num.formatDecimal(this.state.recordBalance.sum)}원</div>
            </div>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Record List</h2>
            <button onClick={this.handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr><th className="p-2 border">ID</th><th className="p-2 border">거래일</th><th className="p-2 border">적요</th><th className="p-2 border">계정분류</th><th className="p-2 border">입금액</th><th className="p-2 border">출금액</th><th className="p-2 border">메모</th></tr>
            </thead>
            <tbody>{this.renderTableList(this.state.dataSet)}</tbody>
          </table>
        </div>
        <RecordAdd key={"RecordAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <RecordEdit key={"RecordEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.acode.dataSync, storeClasses: state.aclass.aclasses, storeCodes: state.acode.acodes });
export default connect(mapStateToProps, null)(Record);