import React from 'react'
import {
  PdsContent,
  PdsSidebar,
  PdsFooter,
  PdsHeader
} from './index'

const PdsLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <PdsSidebar />
      <div className="c-wrapper">
        <PdsHeader />
        <div className="c-body">
          <PdsContent />
        </div>
        <PdsFooter />
      </div>
    </div>
  )
}

export default PdsLayout
