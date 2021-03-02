import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
import { CCol, CContainer, CRow } from '@coreui/react';

class Logout extends Component {

  componentDidMount() {
    let cookies = new Cookies();
    cookies.remove('X-PDS-AUTH');
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4">Logout...</h1>
                <h4 className="pt-3">Remove the login information...</h4>
                <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
              </span>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default withRouter(Logout);
