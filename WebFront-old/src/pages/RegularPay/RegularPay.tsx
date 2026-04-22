import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import RegularPayAdd from './RegularPayAdd';
import RegularPayEdit from './RegularPayEdit';
import RegularPayDel from './RegularPayDel';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

class RegularPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyId: -1,
      dataSet: props.storeRpays,
      currentData: {
        id: -1,
        wdate: new Date(),
        title: '',
        deposit: 0,
        withdrawal: 0,
        accountCode: '',
        monthDay: '',
        sdate: '',
        edate: '',
        memo: '',
      },
      acodeMap: [],
      totalCount: props.storeRpays.length,
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
          this.props.rpayFetchOk(newDataSet);
          break;
        }
      }
    } else {
      this.requestFetch();
    }
  }

  requestFetch() {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/regularPay' : '/pds/v1/regularPay';
    fetch(REQ_URI, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => {
        this.props.rpayFetchOk(resJson.data);
        this.setState({ keywordError: '' });
      }).catch(error => this.setState({ keywordError: error.message }));
  }

  componentDidMount() {
    if (!this.props.storeDataSync) this.requestFetch();
    let classMap = this.props.storeAclasses.reduce((map, obj) => { map[obj.id] = obj; return map; }, {});
    let aMap = this.props.storeAcodes.reduce((map, obj) => {
        map[obj.accountCode] = { ...obj, classObj: classMap[obj.accountCode.substring(0, 1)] };
        return map;
    }, {});
    this.setState({ acodeMap: aMap });
  }

  modalToggleAdd = () => this.setState({ currentData: this.genEmptyObj(), modalFlagAdd: !this.state.modalFlagAdd });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  modalToggleDel = () => this.setState({ modalFlagDel: !this.state.modalFlagDel });
  handleAdd = (e) => { e.preventDefault(); this.modalToggleAdd(); }
  handleEdit = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleEdit(); }
  handleDel = (data, e) => { e.preventDefault(); this.setState({ currentData: data }); this.modalToggleDel(); }

  genEmptyObj() {
    let newId = this.state.emptyId - 1;
    this.setState({ emptyId: newId });
    return { id: newId, wdate: new Date(), title: '', deposit: 0, withdrawal: 0, accountCode: '', monthDay: '', sdate: '', edate: '', memo: '' };
  }

  renderList() {
    return this.props.storeRpays.length === 0 ? <div className="p-4 text-center">No Data</div> :
      this.props.storeRpays.map(data => (
        <div key={"rpay-" + data.id} className="border rounded shadow-sm bg-white p-4">
          <div className="font-bold border-b pb-2 mb-2 flex justify-between">
            {data.title}
            <div className="flex gap-2">
                <button onClick={(e) => this.handleEdit(data, e)} className="text-blue-500">Edit</button>
                <button onClick={(e) => this.handleDel(data, e)} className="text-red-500">Delete</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="bg-gray-200 px-1 rounded">계정코드</span> {this.state.acodeMap[data.accountCode]?.classObj.title + ' > ' + this.state.acodeMap[data.accountCode]?.title}</div>
            <div><span className="bg-gray-200 px-1 rounded">입금금액</span> {Utils.num.formatDecimal(data.deposit)} 원</div>
            <div><span className="bg-gray-200 px-1 rounded">출금금액</span> {Utils.num.formatDecimal(data.withdrawal)} 원</div>
            <div><span className="bg-gray-200 px-1 rounded">등록일자</span> 매월 {data.monthDay}일</div>
            <div><span className="bg-gray-200 px-1 rounded">납입시작</span> {Utils.date.dateFormat(new Date(data.sdate))}</div>
            <div><span className="bg-gray-200 px-1 rounded">납입종료</span> {Utils.date.dateFormat(new Date(data.edate))}</div>
          </div>
          <div className="mt-2 text-sm"><span className="bg-gray-200 px-1 rounded">메모</span> <pre className="inline">{data.memo}</pre></div>
        </div>
      ));
  }

  render() {
    return (
      <div className="space-y-6">
        <div className="bg-white p-4 shadow rounded flex justify-between items-center">
            <h2 className="font-bold text-lg">RegularPay List <small className="text-gray-500">(Total: {this.props.storeRpays.length})</small></h2>
            <button onClick={this.handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">+ 추가</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {this.renderList()}
        </div>
        <RegularPayAdd key={"RegularPayAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <RegularPayEdit key={"RegularPayEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
        <RegularPayDel key={"RegularPayDel-" + this.state.currentData.id} modalFlag={this.state.modalFlagDel} modalToggle={this.modalToggleDel} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.rpay.dataSync, storeRpays: AllActions.rpay.getRegularPay(state), storeAclasses: state.aclass.aclasses, storeAcodes: state.acode.acodes });
const mapDispatchToProps = (dispatch) => ({ rpayFetchOk: (data) => dispatch(AllActions.rpay.rpayFetchOk(data)) });
export default connect(mapStateToProps, mapDispatchToProps)(RegularPay);