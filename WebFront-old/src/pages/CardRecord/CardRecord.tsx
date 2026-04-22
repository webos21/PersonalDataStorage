import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import CardRecordAdd from './CardRecordAdd';
import CardRecordEdit from './CardRecordEdit';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

class CardRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyId: -1,
      dataSet: [],
      currentData: {
        id: -1,
        cardId: -1,
        transactionDate: new Date(),
        title: '',
        price: 0,
        commission: 0,
        installment: 0,
        installmentId: 0,
        installmentTurn: 0,
        amount: 0,
        remainder: 0,
        settlementDate: new Date(),
        accountCode: '',
        paid: 0,
        memo: '',
      },
      cardMap: {},
      cardBalance: {},
      selectedCard: null,
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
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/cardRecord' : '/pds/v1/cardRecord';
    const reqUri = REQ_URI + ((query === null || query === undefined) ? '' : '?q=' + query);

    fetch(reqUri, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => {
        let sortedData = [].concat(resJson.data).sort((a, b) => a.transactionDate > b.transactionDate ? -1 : 1);
        let calcBalance = {};
        sortedData.forEach(data => {
          if (data.paid === 0) {
            if (!calcBalance[data.cardId]) calcBalance[data.cardId] = 0;
            calcBalance[data.cardId] += (data.price + data.commission);
          }
        });
        this.setState({ dataSet: sortedData, cardBalance: calcBalance, totalCount: sortedData.length, keywordError: '' });
      }).catch(error => this.setState({ keywordError: error.message }));
  }

  componentDidMount() {
    if (!this.props.storeDataSync) this.props.cardFetch();
    let cmap = this.props.storeCards.reduce((map, obj) => { map[obj.id] = obj; return map; }, {});
    this.setState({ cardMap: cmap });
    this.requestFetch();
  }

  modalToggleAdd = () => this.setState({ currentData: this.genEmptyObj(), modalFlagAdd: !this.state.modalFlagAdd });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  handleViewAll = () => { this.setState({ keyword: "" }); document.getElementById("frmRefSearch").reset(); }
  handleSearchGo = (e) => { e.preventDefault(); this.setState({ keyword: e.target.keyword.value }); this.requestFetch(e.target.keyword.value); }
  handleAdd = (e) => { e.preventDefault(); this.modalToggleAdd(); }
  handleEdit = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleEdit(); }
  handleCardSelect = (dataId) => this.setState({ selectedCard: dataId });

  genEmptyObj() {
    let newId = this.state.emptyId - 1;
    this.setState({ emptyId: newId });
    return { id: newId, cardId: -1, transactionDate: new Date(), title: '', price: 0, commission: 0, installment: 0, installmentId: 0, installmentTurn: 0, amount: 0, remainder: 0, settlementDate: new Date(), accountCode: '', paid: 0, memo: '' };
  }

  renderCardList(dataArray) {
    return dataArray.map((data, index) => (data.notUsed === 1) ? null : (
        <button key={"card-" + data.id} onClick={() => this.handleCardSelect(data.id)} className={`p-2 border rounded shadow-sm w-full ${this.state.selectedCard === data.id ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}>
            <div className="font-semibold">{data.company}</div>
            <div className="text-sm">{data.cardName}</div>
            <div className={`text-right font-bold ${this.state.cardBalance[data.id] < 0 ? 'text-blue-600' : 'text-black'}`}>
                {Utils.num.formatDecimal(this.state.cardBalance[data.id] || 0)}
            </div>
        </button>
    ));
  }

  renderTableList(dataArray) {
    const filteredData = dataArray.filter(data => !this.state.selectedCard || data.cardId === this.state.selectedCard);
    return filteredData.length === 0 ? <tr><td colSpan="8" className="p-4 text-center">No Data</td></tr> :
      filteredData.map(data => (
        <tr key={'cardRecordData-' + data.id} onClick={(e) => this.handleEdit(data, e)} className="hover:bg-gray-50 cursor-pointer border-b">
          <td className="p-2 border">{data.id}</td>
          <td className="p-2 border">{this.state.cardMap[data.cardId]?.cardName}</td>
          <td className="p-2 border">{Utils.date.dateFormat(new Date(data.transactionDate))}</td>
          <td className="p-2 border">{Utils.date.dateFormat(new Date(data.settlementDate))}</td>
          <td className="p-2 border">{data.title}</td>
          <td className="p-2 border">{data.accountCode}</td>
          <td className="p-2 border text-right">{Utils.num.formatDecimal(data.price)}</td>
          <td className="p-2 border truncate max-w-[140px]">{data.memo}</td>
        </tr>
      ));
  }

  render() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {this.state.selectedCard && <button onClick={() => this.handleCardSelect(null)} className="p-2 border rounded bg-gray-100">모든 카드 보기</button>}
          {this.renderCardList(this.props.storeCards)}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="font-bold text-lg mb-2">Search <small className="text-gray-500">Card Record</small></div>
          <form onSubmit={this.handleSearchGo} id="frmRefSearch" className="flex gap-2">
            <input type="text" name="keyword" placeholder="Enter keyword" className="border p-2 flex-grow rounded" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
            {this.state.keyword !== "" && <button type="reset" onClick={this.handleViewAll} className="px-4 py-2 bg-green-600 text-white rounded">전체보기</button>}
          </form>
          {this.state.keywordError && <p className="text-red-500 text-sm mt-2">{this.state.keywordError}</p>}
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Card Record List <small className="text-gray-500">(Total: {this.state.totalCount})</small></h2>
            <button onClick={this.handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr><th className="p-2 border">ID</th><th className="p-2 border">카드명</th><th className="p-2 border">거래일</th><th className="p-2 border">결제일</th><th className="p-2 border">적요</th><th className="p-2 border">계정코드</th><th className="p-2 border">결제금액</th><th className="p-2 border">메모</th></tr>
            </thead>
            <tbody>{this.renderTableList(this.props.storeCards)}</tbody>
          </table>
        </div>
        <CardRecordAdd key={"CardRecordAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <CardRecordEdit key={"CardRecordEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.card.dataSync, storeCards: state.card.cards });
const mapDispatchToProps = (dispatch) => ({ cardFetch: () => dispatch(AllActions.card.cardFetch()) });
export default connect(mapStateToProps, mapDispatchToProps)(CardRecord);