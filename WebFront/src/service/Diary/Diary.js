import React, { Component } from 'react';
import {
  Button, Card, CardBody, CardHeader, Col, Row, Table,
  Form, Input, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import Pager from '../../components/Pager';
import DiaryAdd from './DiaryAdd.js';
import DiaryEdit from './DiaryEdit.js';
import DiaryDel from './DiaryDel.js';
import update from 'immutability-helper';
import Cookies from 'universal-cookie';
import { dateFormat } from '../../components/Util/DateUtil'

class Diary extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.dataChangedCallback = this.dataChangedCallback.bind(this);
    this.renderTableList = this.renderTableList.bind(this);

    this.handleViewAll = this.handleViewAll.bind(this);
    this.handleSearchGo = this.handleSearchGo.bind(this);
    this.handlePageChanged = this.handlePageChanged.bind(this);

    this.state = {
      dataSet: [],
      totalCount: 0,
      itemsPerPage: 10,
      totalPage: 0,
      currentPage: 0,
      visiblePages: 10,
      keyword: "",
      keywordError: "",
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  dataChangedCallback(modifiedData) {
    console.log("Diary::dataChangedCallback");
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

  requestFetch(query, page) {
    const parentState = this;
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/diary' : '/pds/v1/diary';

    const reqUri = REQ_URI + '?perPage=' + this.state.itemsPerPage +
      '&page=' + ((page === null || page === undefined) ? 1 : page) +
      ((query === null || query === undefined) ? '' : '&q=' + query);
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
      console.log("Diary::fetch => " + resJson.result);

      var dataLen = resJson.pagination.totalCount;
      var calcPages = Math.ceil(dataLen / parentState.state.itemsPerPage);

      parentState.setState({
        dataSet: resJson.data,
        totalCount: dataLen,
        currentPage: (resJson.pagination.currentPage - 1),
        totalPage: calcPages,
        keywordError: '',
      });
    }).catch(function (error) {
      console.log("Diary::fetch => " + error);
      parentState.setState({ keywordError: error.message })
    });
  }

  componentDidMount() {
    this.requestFetch();
  }

  handleViewAll() {
    this.setState({ keyword: "" });
    this.requestFetch("");
    document.getElementById("frmRefSearch").reset();
  }

  handlePageChanged(newPage) {
    this.requestFetch(this.state.keyword, newPage);
  }

  handleSearchGo(event) {
    event.preventDefault();
    this.setState({ keyword: event.target.keyword.value });
    this.requestFetch(event.target.keyword.value);
  }

  renderTableList(dataArray) {
    if (dataArray.length === 0) {
      return (
        <tr key="row-nodata">
          <td colSpan="5" className="text-center align-middle" height="200">No Data</td>
        </tr>
      )
    } else {
      return dataArray.map((data, index) => {
        return (
          <tr key={'diary-' + data.id}>
            <td>{data.id}</td>
            <td>{dateFormat(new Date(data.wdate))}</td>
            <td>{data.title}</td>
            <td>
              <DiaryEdit dataFromParent={data} callbackFromParent={this.dataChangedCallback} />
              &nbsp;
              <DiaryDel dataFromParent={data} callbackFromParent={this.dataChangedCallback} />
            </td>
          </tr>
        )
      })
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Search</strong>
                <small> Diary</small>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSearchGo} id="frmRefSearch">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Keyword</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="keyword" placeholder="Enter the search keyword" />
                        <InputGroupAddon addonType="append">
                          <Button type="submit" color="primary">Search</Button>
                        </InputGroupAddon>
                        {this.state.keyword !== "" &&
                          <InputGroupAddon addonType="append">
                            <Button type="reset" color="success" onClick={this.handleViewAll}>전체보기</Button>
                          </InputGroupAddon>
                        }
                      </InputGroup>
                      <small id="keywordError" className="text-danger">{this.state.keywordError}</small>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Diary List (Total : {this.state.totalCount})
                <DiaryAdd callbackFromParent={this.dataChangedCallback} />
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>번호</th>
                      <th>작성일</th>
                      <th>제목</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableList(this.state.dataSet)}
                  </tbody>
                </Table>
                <Pager
                  total={this.state.totalPage}
                  current={this.state.currentPage}
                  visiblePages={this.state.visiblePages}
                  titles={{ first: 'First', last: 'Last' }}
                  onPageChanged={this.handlePageChanged}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Diary;
