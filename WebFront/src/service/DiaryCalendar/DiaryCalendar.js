import React, { Component } from 'react';

import { CCol, CRow } from '@coreui/react';
import DiaryAdd from './DiaryAdd.js';
import DiaryEdit from './DiaryEdit.js';
import update from 'immutability-helper';
import { dateFormat } from '../../components/Util/DateUtil'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

// const DiaryDebugLog = (args) => { };
const DiaryDebugLog = console.log;

class DiaryCalendar extends Component {
  constructor(props) {
    super(props);

    this.requestAnniversary = this.requestAnniversary.bind(this);
    this.requestFetch = this.requestFetch.bind(this);
    this.dataChangedCallback = this.dataChangedCallback.bind(this);

    this.modalToggleAdd = this.modalToggleAdd.bind(this);
    this.modalToggleEdit = this.modalToggleEdit.bind(this);

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

  requestAnniversary(year) {
    DiaryDebugLog("[requestAnniversary]");

    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/anniversary' : '/pds/v1/anniversary';

    const reqUri = REQ_URI + ((year !== undefined && year !== null) ? '?year=' + year : '');

    fetch(reqUri, {
      method: 'GET',
      headers: new Headers({
        'X-PDS-AUTH': localStorage.getItem("X-PDS-AUTH"),
        'Authorization': 'Basic ' + btoa('username:password'),
      })
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

      let anniContents = [];

      resJson.data.forEach((data, index) => {
        // DiaryDebugLog("Fetched Data!!!!!", data);

        let txtColor = (data.holiday === 1) ? 'fc-day-sun' : 'fc-day';

        let aText = {
          id: (10000 + data.id),
          title: data.title,
          start: data.thisYear,
          display: 'background',
          className: txtColor,
          backgroundColor: 'white',
          source: 'anniversary',
          extendedProps: {
            dataId: data.id
          }
        };

        anniContents[index] = aText;
      });

      parentState.setState({
        anniversaryEvents: anniContents,
        currentEvents: [...parentState.state.anniversaryEvents, ...anniContents]
      });
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
      headers: new Headers({
        'X-PDS-AUTH': localStorage.getItem("X-PDS-AUTH"),
        'Authorization': 'Basic ' + btoa('username:password'),
      })
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
          start: dateFormat(new Date(data.wdate)),
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
            start: dateFormat(new Date(modifiedData.wdate)),
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

  handleDateSet(dateInfo) {
    DiaryDebugLog("handleDateSet!!!!!", dateInfo);

    let monthStart = new Date(dateInfo.start.getFullYear(), dateInfo.start.getMonth(), dateInfo.start.getDate() + 8);
    let year = monthStart.getFullYear();
    let month = monthStart.getMonth() + 1;

    let yearChanged = (year !== this.state.viewYear);

    this.setState({
      viewYear: year,
      viewMonth: month,
    })

    this.requestFetch(year, month);
    
    if (yearChanged || this.state.anniversaryEvents.length === 0) {
      this.requestAnniversary(year);
    }
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

export default DiaryCalendar;
