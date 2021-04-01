import React, { Component } from 'react';
import { connect } from 'react-redux'
import update from 'immutability-helper';

import { CCol, CRow } from '@coreui/react';
import DiaryAdd from './DiaryAdd.js';
import DiaryEdit from './DiaryEdit.js';
import AllActions from '../../actions'
import Helper from '../../helpers'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const DiaryDebugLog = (args) => { };
// const DiaryDebugLog = console.log;

class DiaryCalendar extends Component {
  constructor(props) {
    super(props);

    this.requestAnniversary = this.requestAnniversary.bind(this);
    this.requestFetch = this.requestFetch.bind(this);
    this.dataChangedCallback = this.dataChangedCallback.bind(this);

    this.modalToggleAdd = this.modalToggleAdd.bind(this);
    this.modalToggleEdit = this.modalToggleEdit.bind(this);

    this.applyAnni = this.applyAnni.bind(this);

    this.handleDateSet = this.handleDateSet.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.renderEventContent = this.renderEventContent.bind(this);

    this.state = {
      dataSet: [],
      currentData: {
        id: -1,
        title: '',
        wdate: '',
        weather: '',
        content: '',
      },
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
    DiaryDebugLog("[requestAnniversary]");

    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/anniversary' : '/pds/v1/anniversary';

    fetch(REQ_URI, {
      method: 'GET',
      headers: Helper.auth.makeAuthHeader(),
    }).then(function (res) {
      if (!res.ok) {
        if (res.status === 401) {
          window.location = "/#/logout";
        }
        throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
      }
      return res.json();
    }).then(function (resJson) {
      DiaryDebugLog("Anniversary::fetch => " + resJson.result);

      parentState.props.anniFetchOk(resJson.data);
      // something to do
    }).catch(function (error) {
      DiaryDebugLog("Anniversary::fetch => " + error);
      parentState.setState({ keywordError: error.message })
    });
  }

  requestFetch(year, month) {
    DiaryDebugLog("[requestFetch] year = " + year + " / month = " + month);

    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/diary' : '/pds/v1/diary';

    const reqUri = REQ_URI + '?year=' + year + '&month=' + month;

    fetch(reqUri, {
      method: 'GET',
      headers: Helper.auth.makeAuthHeader(),
    }).then(function (res) {
      if (!res.ok) {
        if (res.status === 401) {
          window.location = "/#/logout";
        }
        throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
      }
      return res.json();
    }).then(function (resJson) {
      DiaryDebugLog("Diary::fetch => " + resJson.result);

      let diaryContents = [];
      resJson.data.forEach((data, index) => {
        DiaryDebugLog("index = " + index);

        let aText = {
          id: index,
          title: data.title,
          start: Helper.date.dateFormat(new Date(data.wdate)),
          source: 'diary',
          extendedProps: {
            dataId: data.id
          }
        };
        diaryContents[index] = aText;
      });

      parentState.setState({
        dataSet: resJson.data,
        currentEvents: [...diaryContents, ...parentState.state.anniversaryEvents]
      });
    }).catch(function (error) {
      DiaryDebugLog("Diary::fetch => " + error);
      parentState.setState({ keywordError: error.message })
    });
  }

  dataChangedCallback(modifiedData) {
    DiaryDebugLog("Diary::dataChangedCallback");
    if (modifiedData !== undefined && modifiedData !== null) {
      for (var i = 0; i < this.state.dataSet.length; i++) {
        if (this.state.dataSet[i].id === modifiedData.id) {
          var newDataSet = update(this.state.dataSet, { $splice: [[i, 1, modifiedData]] });
          var aText = {
            id: i,
            title: modifiedData.title,
            start: Helper.date.dateFormat(new Date(modifiedData.wdate)),
            extendedProps: {
              dataId: modifiedData.id
            }
          };
          var newCurrentEvents = update(this.state.currentEvents, { $splice: [[i, 1, aText]] });
          var renderTimes = this.state.tableRerender + 1;
          this.setState({ tableRerender: renderTimes, dataSet: newDataSet, currentEvents: newCurrentEvents });
          break;
        }
      }
    } else {
      this.requestFetch(this.state.viewYear, this.state.viewMonth);
    }
  }

  componentDidMount() {
    if (!this.props.storeDataSync) {
      this.requestAnniversary();
    }
  }

  modalToggleAdd() {
    this.setState({
      modalFlagAdd: !this.state.modalFlagAdd,
    });
  }

  modalToggleEdit() {
    this.setState({
      modalFlagEdit: !this.state.modalFlagEdit,
    });
  }

  applyAnni(dateInfo) {
    let lsdate = Helper.date.solar2lunar(dateInfo.start);
    let ledate = Helper.date.solar2lunar(dateInfo.end);

    let lunarCalendar = [];
    for (let i = dateInfo.start.getTime(); i < dateInfo.end.getTime(); i += 86400000) {
      let solarDate = new Date(i);
      let tmp = Helper.date.solar2lunar(solarDate);
      lunarCalendar[new Date(tmp.year, tmp.month, tmp.day)] = solarDate;
    }

    let lunarStart = new Date(lsdate.year, lsdate.month, lsdate.day);
    let lunarEnd = new Date(ledate.year, ledate.month, ledate.day);

    let lunarYearDiff = (lsdate.year !== ledate.year);
    let solarYearDiff = (dateInfo.start.getFullYear() !== dateInfo.end.getFullYear());

    DiaryDebugLog("Lunar Start", lunarStart);
    DiaryDebugLog("Lunar End", lunarEnd);

    let anniEvents = [];
    this.props.storeAnnis.filter((data, index) => {

      let dataMon = data.applyDate.substring(0, 2) - 1;
      let dataDay = data.applyDate.substring(2, 4) - 0;

      let startDate = null;
      let viewTitle = null;

      if (data.lunar === 1) {
        let yearVal = lunarEnd.getFullYear();
        if (lunarYearDiff && dataMon === 11) {
          yearVal--;
        }
        let dataDate = new Date(yearVal, dataMon, dataDay);
        if (dataDate >= lunarStart && dataDate < lunarEnd) {
          DiaryDebugLog("Lunar : Data Date", dataDate, data);

          let findSolarDay = lunarCalendar[dataDate];
          if (!findSolarDay) {
            DiaryDebugLog('find solar date : error1', findSolarDay);
            dataDate = new Date(yearVal, dataMon, (dataDay - 1))
            findSolarDay = lunarCalendar[dataDate];
            if (!findSolarDay) {
              DiaryDebugLog('find solar date : error2', findSolarDay);
              dataDate = new Date(yearVal, dataMon, (dataDay - 2))
              findSolarDay = lunarCalendar[dataDate];
            }
          }
          DiaryDebugLog('find solar date : last', findSolarDay);

          startDate = Helper.date.dateFormat(findSolarDay);
          DiaryDebugLog("Lunar : View Date", startDate);

          viewTitle = data.title + '(음 ' + (dataDate.getMonth() + 1) + '.' + dataDate.getDate() + ')';
        } else {
          return false;
        }
      } else {
        let yearVal = dateInfo.end.getFullYear();
        if (solarYearDiff && dataMon === 11) {
          yearVal--;
        }
        let dataDate = new Date(yearVal, dataMon, dataDay);
        if (dataDate >= dateInfo.start && dataDate < dateInfo.end) {
          DiaryDebugLog("Solar : Data Date", dataDate, data);
          startDate = dateInfo.start.getFullYear() + '-' + data.applyDate.substring(0, 2) + '-' + data.applyDate.substring(2, 4);
          viewTitle = data.title;
        } else {
          return false;
        }
      }

      let txtColor = (data.holiday === 1) ? 'fc-day-sun' : 'fc-day';
      let aText = {
        id: (10000 + data.id),
        title: viewTitle,
        start: startDate,
        display: 'background',
        className: txtColor,
        backgroundColor: 'white',
        source: 'anniversary',
        extendedProps: {
          dataId: data.id
        }
      };

      anniEvents[anniEvents.length] = aText;

      return true;
    });

    DiaryDebugLog(anniEvents);

    this.setState({
      anniversaryEvents: anniEvents
    })
  }

  handleDateSet(dateInfo) {
    DiaryDebugLog("handleDateSet!!!!!", dateInfo);

    let monthStart = new Date(dateInfo.start.getFullYear(), dateInfo.start.getMonth(), dateInfo.start.getDate() + 8);
    let year = monthStart.getFullYear();
    let month = monthStart.getMonth() + 1;

    this.setState({
      viewYear: year,
      viewMonth: month,
    })

    this.applyAnni(dateInfo);

    this.requestFetch(year, month);
  }

  // When the date is clicked
  handleDateSelect(selectInfo) {
    DiaryDebugLog("handleDateSelect!!!!!", selectInfo);
    this.setState({
      selectedDate: selectInfo.start
    });
    this.modalToggleAdd();
  }

  // When the event is clicked
  handleEventClick(clickInfo) {
    DiaryDebugLog("handleEventClick!!!!!", clickInfo);

    let eventData = this.state.dataSet[clickInfo.event.id];
    DiaryDebugLog("eventData", eventData);

    this.setState({
      currentData: eventData,
    });
    this.modalToggleEdit();
  }

  renderEventContent(eventInfo) {
    DiaryDebugLog("eventInfo", eventInfo);
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  render() {
    return (
      <CRow>
        <CCol>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            customButtons={{
              myCustomButton: {
                text: 'To Board',
                click: function () {
                  window.location.href = '/#/diary-board';
                }
              }
            }}
            headerToolbar={{
              left: 'myCustomButton',
              center: 'title',
              right: 'prevYear,prev,today,next,nextYear'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={this.state.currentEvents}
            datesSet={this.handleDateSet}
            select={this.handleDateSelect}
            eventClick={this.handleEventClick}
          //              eventContent={this.renderEventContent} // custom render function
          />

        </CCol>
        <DiaryAdd modalFlag={this.state.modalFlagAdd} modalToggle={this.modalToggleAdd} dataFromParent={this.state.selectedDate} callbackFromParent={this.dataChangedCallback} />
        <DiaryEdit modalFlag={this.state.modalFlagEdit} modalToggle={this.modalToggleEdit} dataFromParent={this.state.currentData} callbackFromParent={this.dataChangedCallback} />
      </CRow>
    );
  }
}

const mapStateToProps = (state) => ({
  storeDataSync: state.anni.dataSync,
  storeAnnis: state.anni.annis,
});

const mapDispatchToProps = (dispatch) => ({
  anniFetchOk: (data) => dispatch(AllActions.anni.anniFetchOk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryCalendar);
