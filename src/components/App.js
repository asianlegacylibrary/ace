import React from 'react'

import TopBar from './TopBar'
import Viewer from './Viewer'
import Details from './Details'
import Forms from './Forms'

import '../assets/css/layout-flex.scss'

export const App = () => {
  return (
    <div>
      <div className="wrapper-view">
        <TopBar />
        <Viewer />
      </div>
      <div className="wrapper-entry">
        <Details />
        <Forms />
      </div>
    </div>
  )
}
