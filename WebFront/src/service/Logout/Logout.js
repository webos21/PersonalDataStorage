import React, { Component } from 'react';
import { connect } from 'react-redux'

import { CCol, CContainer, CRow } from '@coreui/react';

import AllActions from 'src/actions';

class Logout extends Component {

  componentDidMount() {
    this.props.logOut();
    this.props.toHome();
  }

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
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

const mapStateToProps = (state, ownProps) => ({
  storeLogOn: state.auth.logOn,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(AllActions.auth.authLogout()),
  toHome: () => dispatch(AllActions.auth.authHome()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
