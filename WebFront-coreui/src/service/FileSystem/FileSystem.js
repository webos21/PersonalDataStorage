import React, { useEffect } from 'react';

import { CCol, CContainer, CRow } from '@coreui/react';

const FileSystem = props => {

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      window.location.href = '/pds/v1/fs/';
    } else {

    }
  }, []);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <span className="clearfix">
              <h1 className="float-left display-3 mr-4">File Man.</h1>
              <h4 className="pt-3">Working on wrapping the file system...</h4>
              <p className="text-muted float-left">The page you are looking for is shown at 28080.</p>
            </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default FileSystem;
