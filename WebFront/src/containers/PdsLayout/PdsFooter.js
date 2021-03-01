import React from 'react'
import { CFooter } from '@coreui/react'

const PdsFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span><a href="https://webos21.github.io/PersonalDataStorage/">PersonalDataStorage</a> &copy; 2020 NeoFoundation.</span>
      </div>
      <div className="mfs-auto">
        <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span>
      </div>
    </CFooter>
  )
}

export default React.memo(PdsFooter)
