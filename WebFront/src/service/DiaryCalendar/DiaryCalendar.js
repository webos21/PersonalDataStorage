import React, { Component } from 'react';

import { Col, Row } from 'reactstrap';
import DiaryAdd from './DiaryAdd.js';
import DiaryEdit from './DiaryEdit.js';
import DiaryDel from './DiaryDel.js';
import update from 'immutability-helper';
import Cookies from 'universal-cookie';
import { dateFormat } from '../../components/Util/DateUtil'

import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const DiaryDebugLog = (args) => { };
// const DiaryDebugLog = console.log;

class DiaryCalendar extends Component {
  constructor(props) {
    super(props);

    this.dataChangedCallback = this.dataChangedCallback.bind(this);

    this.handleDateSet = this.handleDateSet.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.renderEventContent = this.renderEventContent.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);

    this.state = {
      dataSet: [],
      weekendsVisible: true,
      currentEvents: [],
    };

    this.todayStr = new Date().toISOString().replace(/T.*$/, '');
    this.eventGuid = 0;
  }

  dataChangedCallback(modifiedData) {
    DiaryDebugLog("Diary::dataChangedCallback");
    if (modifiedData !== undefined && modifiedData !== null) {
      for (var i = 0; i < this.state.dataSet.length; i++) {
        if (this.state.dataSet[i].id === modifiedData.id) {
          var newDataSet = update(this.state.dataSet, { $splice: [[i, 1, modifiedData]] });
          var renderTimes = this.state.tableRerender + 1;
          this.setState({ tableRerender: renderTimes, dataSet: newDataSet });
          break;
        }
      }
    } else {
      this.requestFetch(this.state.keyword);
    }
  }

  requestFetch(year, month) {
    DiaryDebugLog("this.todayStr = " + this.todayStr + " / year = " + year + " / month = " + month);

    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/diary' : '/pds/v1/diary';

    const reqUri = REQ_URI + '?year=' + year + '&month=' + month;
    const cookies = new Cookies();

    fetch(reqUri, {
      method: 'GET',
      headers: new Headers({
        'X-PDS-AUTH': cookies.get("X-PDS-AUTH"),
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

      let diaryTexts = [];
      resJson.data.map((data) => {
        let aText = {
          id: data.id,
          title: data.title,
          start: dateFormat(new Date(data.wdate))
        };
        diaryTexts[diaryTexts.length] = aText;
      })

      parentState.setState({
        dataSet: resJson.data,
        currentEvents: diaryTexts
      });
    }).catch(function (error) {
      DiaryDebugLog("Diary::fetch => " + error);
      parentState.setState({ keywordError: error.message })
    });
  }

  createEventId() {
    return String(this.eventGuid++);
  }

  handleDateSet(dateInfo) {
    DiaryDebugLog("handleDateSet!!!!!", dateInfo);

    let monthStart = new Date(dateInfo.start.getFullYear(), dateInfo.start.getMonth(), dateInfo.start.getDate() + 8);
    let year = monthStart.getFullYear();
    let month = monthStart.getMonth() + 1;

    this.requestFetch(year, month);
  }

  // When the date is clicked
  handleDateSelect(selectInfo) {
    DiaryDebugLog("handleDateSelect!!!!!", selectInfo);

    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }

  }

  // When the event is clicked
  handleEventClick(clickInfo) {
    DiaryDebugLog("handleEventClick!!!!!", clickInfo);

    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
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
              weekends={this.state.weekendsVisible}
              events={this.state.currentEvents}
              datesSet={this.handleDateSet}
              select={this.handleDateSelect}
              eventContent={this.renderEventContent} // custom render function
              eventClick={this.handleEventClick}
            />

          </Col>
        </Row>
      </div>

    );
  }
}

export default DiaryCalendar;
