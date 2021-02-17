import React, { Component } from 'react';
import PbFormEdit from './PbFormEdit.js';
import PbFormDel from './PbFormDel.js';

class PbList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: props.dataFromParent,
            currentPage: props.currentPage,
            itemsPerPage: props.itemsPerPage
        }
    }
    
    render() {
        if (this.state.dataArray.length === 0) {
            return (
              <tr key="row-nodata">
                <td colSpan="5" className="text-center align-middle" height="200">No Data</td>
              </tr>
            )
          } else {
            var firstIdx = this.state.currentPage * this.state.itemsPerPage;
            var lastIdx = this.state.currentPage * this.state.itemsPerPage + this.state.itemsPerPage;
            var tableData = this.state.dataArray.slice(firstIdx, lastIdx);
      
            return tableData.map((data, index) => {
              return (
                <tr key={'pbdata-' + data.id}>
                  <td>{data.siteName}</td>
                  <td>{data.siteType}</td>
                  <td><a href={data.siteUrl} target="_blank" rel="noopener noreferrer">{data.siteUrl}</a></td>
                  <td>{data.myId}</td>
                  <td>
                    <PbFormEdit dataFromParent={data} callbackFromParent={this.dataChangedCallback} />
                    &nbsp;
                    <PbFormDel dataFromParent={data} callbackFromParent={this.dataChangedCallback} />
                  </td>
                </tr>
              )
            })
          }
    }
};

export default PbList;
