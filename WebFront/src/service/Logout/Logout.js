import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { CCol, CContainer, CRow } from '@coreui/react';

import AllActions from 'src/actions';

const Logout = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllActions.aclass.aclassClear());
    dispatch(AllActions.acode.acodeClear());
    dispatch(AllActions.anni.anniClear());
    dispatch(AllActions.bank.bankClear());
    dispatch(AllActions.card.cardClear());
    dispatch(AllActions.insure.insureClear());
    dispatch(AllActions.restate.restateClear());
    dispatch(AllActions.rpay.rpayClear());
    dispatch(AllActions.stock.stockClear());
    dispatch(AllActions.auth.authLogout());
    dispatch(AllActions.auth.authHome());
  }, [dispatch]);

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

export default Logout;
