import React from 'react'

import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CButton
} from '@coreui/react'

import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <LoginForm />
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>PersonalDataStorage Web</h2>
                    <hr />
                    <p className="text-left">개인자료보관소 App은 개인의 다양한 데이터를 보관하게 하는 유용한 도구입니다.
                         여기에 사용 편의성을 돕는 웹페이지를 App이 서비스 해 줍니다.</p>
                    <a href="https://webos21.github.io/PersonalDataStorage" target="_blank" rel="noopener noreferrer">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>홈페이지 가기</CButton>
                    </a>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
