import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import DiaryAdd from './DiaryAdd';
import DiaryEdit from './DiaryEdit';
import AllActions from '../../store/reducers'
import Utils from '../../utils/index'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const DiaryDebugLog = (args) => { };

class DiaryCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      currentData: { id: -1, title: '', wdate: '', weather: '', content: '', },
      anniversaryEvents: [],
      currentEvents: [],
      viewYear: 2020,
      viewMonth: 2,
      selectedDate: new Date(),
      modalFlagAdd: false,
      modalFlagEdit: false,
    };
  }

  requestAnniversary() {
    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/anniversary' : '/pds/v1/anniversary';
    fetch(REQ_URI, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => parentState.props.anniFetchOk(resJson.data))
      .catch(error => DiaryDebugLog("Anniversary::fetch => " + error));
  }

  requestFetch(year, month) {
    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/diary' : '/pds/v1/diary';
    const reqUri = REQ_URI + '?year=' + year + '&month=' + month;

    fetch(reqUri, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
      .then(res => res.json())
      .then(resJson => {
        let diaryContents = resJson.data.map((data, index) => ({
            id: index,
            title: data.title,
            start: Utils.date.dateFormat(new Date(data.wdate)),
            source: 'diary',
            extendedProps: { dataId: data.id }
        }));
        parentState.setState({ dataSet: resJson.data, currentEvents: [...diaryContents, ...parentState.state.anniversaryEvents] });
      }).catch(error => DiaryDebugLog("Diary::fetch => " + error));
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
      this.requestFetch(this.state.viewYear, this.state.viewMonth);
    }
  }

  componentDidMount() { if (!this.props.storeDataSync) this.requestAnniversary(); }

  modalToggleAdd = () => this.setState({ modalFlagAdd: !this.state.modalFlagAdd });
  modalToggleEdit = () => this.setState({ modalFlagEdit: !this.state.modalFlagEdit });
  handleDateSet(dateInfo) {
    let monthStart = new Date(dateInfo.start.getFullYear(), dateInfo.start.getMonth(), dateInfo.start.getDate() + 8);
    let year = monthStart.getFullYear();
    let month = monthStart.getMonth() + 1;
    this.setState({ viewYear: year, viewMonth: month });
    this.requestFetch(year, month);
  }
  handleDateSelect = (selectInfo) => this.setState({ selectedDate: selectInfo.start }, this.modalToggleAdd);
  handleEventClick = (clickInfo) => {
    let eventData = this.state.dataSet[clickInfo.event.id];
    this.setState({ currentData: eventData }, this.modalToggleEdit);
  }

  render() {
    return (
      <div className="w-full">
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'custom',
              center: 'title',
              right: 'prevYear,prev,today,next,nextYear'
            }}
            customButtons={{
              custom: { text: 'To Board', click: () => window.location.href = '/#/diary-board' }
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            datesSet={this.handleDateSet}
            select={this.handleDateSelect}
            eventClick={this.handleEventClick}
            events={this.state.currentEvents}
        />
        <DiaryAdd key={"DiaryAdd-" + this.state.currentData.id} modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.selectedDate} callbackFromParent={this.dataChangedCallback} />
        <DiaryEdit key={"DiaryEdit-" + this.state.currentData.id} modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ storeDataSync: state.anni.dataSync, storeAnnis: state.anni.annis });
const mapDispatchToProps = (dispatch) => ({ anniFetchOk: (data) => dispatch(AllActions.anni.anniFetchOk(data)) });
export default connect(mapStateToProps, mapDispatchToProps)(DiaryCalendar);