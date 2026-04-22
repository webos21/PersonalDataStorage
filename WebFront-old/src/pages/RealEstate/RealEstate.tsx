import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import RealEstateAdd from './RealEstateAdd';
import RealEstateEdit from './RealEstateEdit';
import RealEstateDel from './RealEstateDel';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

class RealEstate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyId: -1,
      dataSet: props.storeRestates,
      currentData: {
        id: -1,
        estateType: '',
        title: '',
        holder: '',
        estimate: 0,
        loan: 0,
        acquisitionDate: '',
        estimateDate: '',
        arrange: '',
        memo: '',
      },
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
          this.props.restateFetchOk(newDataSet);
          break;
        }
      }
    } else {
      this.requestFetch();
    }
  }

  requestFetch() {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/realestate' : '/pds/v1/realestate';
    fetch(REQ_URI, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => this.props.restateFetchOk(resJson.data))
      .catch(error => console.error(error));
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
    return { id: newId, estateType: '', title: '', holder: '', estimate: 0, loan: 0, acquisitionDate: '', estimateDate: '', arrange: '', memo: '' };
  }

  renderList() {
    return this.props.storeRestates.length === 0 ? <div className="p-4 text-center">No Data</div> :
      this.props.storeRestates.map(data => (
        <div key={"restate-" + data.id} className="border rounded shadow-sm bg-white p-4">
          <div className="font-bold border-b pb-2 mb-2 flex justify-between">
            [{data.estateType}] {data.title}
            <div className="flex gap-2">
                <button onClick={(e) => this.handleEdit(data, e)} className="text-blue-500">Edit</button>
                <button onClick={(e) => this.handleDel(data, e)} className="text-red-500">Delete</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="bg-gray-200 px-1 rounded">소유자명</span> {data.holder}</div>
            <div><span className="bg-gray-200 px-1 rounded">예상가격</span> {Utils.num.formatDecimal(data.estimate)} 원</div>
            <div><span className="bg-gray-200 px-1 rounded">담보대출</span> {Utils.num.formatDecimal(data.loan)} 원</div>
            <div><span className="bg-gray-200 px-1 rounded">취득일자</span> {Utils.date.dateFormat(new Date(data.acquisitionDate))}</div>
            <div><span className="bg-gray-200 px-1 rounded">산정일자</span> {Utils.date.dateFormat(new Date(data.estimateDate))}</div>
            <div><span className="bg-gray-200 px-1 rounded">정렬순서</span> {data.arrange}</div>
          </div>
          <div className="mt-2 text-sm"><span className="bg-gray-200 px-1 rounded">메모</span> <pre className="inline">{data.memo}</pre></div>
        </div>
      ));
  }

  render() {
    return (
      <div className="space-y-6">
        <div className="bg-white p-4 shadow rounded flex justify-between items-center">
            <h2 className="font-bold text-lg">RealEstate List <small className="text-gray-500">(Total: {this.props.storeRestates.length})</small></h2>
            <button onClick={this.handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {this.renderList()}
        </div>
        <RealEstateAdd key={"RealEstateAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <RealEstateEdit key={"RealEstateEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <RealEstateDel key={"RealEstateDel-" + this.state.currentData.id} modalFlag={this.state.modalFlagDel} modalToggle={this.modalToggleDel} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.restate.dataSync, storeRestates: state.restate.restates });
const mapDispatchToProps = (dispatch) => ({ restateFetchOk: (data) => dispatch(AllActions.restate.restateFetchOk(data)) });
export default connect(mapStateToProps, mapDispatchToProps)(RealEstate);