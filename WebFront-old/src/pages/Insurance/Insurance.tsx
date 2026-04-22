import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import InsuranceAdd from './InsuranceAdd';
import InsuranceEdit from './InsuranceEdit';
import InsuranceDel from './InsuranceDel';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

class Insurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyId: -1,
      dataSet: props.storeInsures,
      currentData: {
        id: -1, company: '', product: '', insuranceType: '', policyType: '', contractId: '', policyHolder: '', insured: '',
        payCountTotal: '', payCountDone: '', premiumVolume: '', premiumMode: '', arranger: '', contractStatus: '',
        contractDate: '', maturityDate: '', memo: '',
      },
      totalCount: props.storeInsures.length,
      keyword: "",
      keywordError: "",
      modalFlagAdd: false,
      modalFlagEdit: false,
      modalFlagDel: false,
    };
  }

  dataChangedCallback(modifiedData) {
    if (modifiedData) {
      for (var i = 0; i < this.state.dataSet.length; i++) {
        if (this.state.dataSet[i].id === modifiedData.id) {
          var newDataSet = update(this.state.dataSet, { $splice: [[i, 1, modifiedData]] });
          this.setState({ dataSet: newDataSet });
          this.props.insureFetchOk(newDataSet);
          break;
        }
      }
    } else {
      this.requestFetch();
    }
  }

  requestFetch() {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insurance' : '/pds/v1/insurance';
    fetch(REQ_URI, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => {
        this.props.insureFetchOk(resJson.data);
        this.setState({ keywordError: '' });
      }).catch(error => this.setState({ keywordError: error.message }));
  }

  componentDidMount() { if (!this.props.storeDataSync) this.requestFetch(); }

  modalToggleAdd = () => this.setState({ currentData: this.genEmptyObj(), modalFlagAdd: !this.state.modalFlagAdd });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  modalToggleDel = () => this.setState({ modalFlagDel: !this.state.modalFlagDel });
  handleAdd = (e) => { e.preventDefault(); this.modalToggleAdd(); }
  handleEdit = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleEdit(); }
  handleDel = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleDel(); }

  genEmptyObj() {
    let newId = this.state.emptyId - 1;
    this.setState({ emptyId: newId });
    return { id: newId, company: '', product: '', insuranceType: '', policyType: '', contractId: '', policyHolder: '', insured: '', payCountTotal: '', payCountDone: '', premiumVolume: '', premiumMode: '', arranger: '', contractStatus: '', contractDate: '', maturityDate: '', memo: '' };
  }

  renderList() {
    return this.props.storeInsures.length === 0 ? <div className="col-span-full p-4 text-center">No Data</div> :
      this.props.storeInsures.map(data => (
        <div key={"insure-" + data.id} className="border rounded shadow-sm bg-white p-4">
          <div className="font-bold border-b pb-2 mb-2 flex justify-between">
            {data.company + '-' + data.product}
            <div className="flex gap-2">
                <button onClick={(e) => this.handleEdit(data, e)} className="text-blue-500">Edit</button>
                <button onClick={(e) => this.handleDel(data, e)} className="text-red-500">Delete</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="bg-gray-200 px-1 rounded">보험종류</span> {data.insuranceType}</div>
            <div><span className="bg-gray-200 px-1 rounded">계약번호</span> {data.contractId}</div>
            <div><span className="bg-gray-200 px-1 rounded">피보험자</span> {data.insured}</div>
            <div><span className="bg-gray-200 px-1 rounded">납입금액</span> {Utils.num.formatDecimal(data.premiumVolume)} 원</div>
            <div><span className="bg-gray-200 px-1 rounded">계약일자</span> {Utils.date.dateFormat(new Date(data.contractDate))}</div>
            <div><span className="bg-gray-200 px-1 rounded">만료일자</span> {Utils.date.dateFormat(new Date(data.maturityDate))}</div>
          </div>
          <div className="mt-2 text-sm"><span className="bg-gray-200 px-1 rounded">메모</span> <pre className="inline">{data.memo}</pre></div>
        </div>
      ));
  }

  render() {
    return (
      <div className="space-y-6">
        <div className="bg-white p-4 shadow rounded flex justify-between items-center">
            <h2 className="font-bold text-lg">Insurance List <small className="text-gray-500">(Total: {this.props.storeInsures.length})</small></h2>
            <button onClick={this.handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {this.renderList()}
        </div>
        <InsuranceAdd key={"InsuranceAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <InsuranceEdit key={"InsuranceEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <InsuranceDel key={"InsuranceDel-" + this.state.currentData.id} modalFlag={this.state.modalFlagDel} modalToggle={this.modalToggleDel} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.insure.dataSync, storeInsures: state.insure.insures });
const mapDispatchToProps = (dispatch) => ({ insureFetchOk: (data) => dispatch(AllActions.insure.insureFetchOk(data)) });
export default connect(mapStateToProps, mapDispatchToProps)(Insurance);