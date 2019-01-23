import React from 'react'

import TopBar from './TopBar'
import { Viewer } from './Viewer'
import { Details } from './Details'
import { Form } from './Form'

import '../assets/css/index.scss'

export const App = () => {
  return (
    <div>
      <div className="wrapper-view">
        <TopBar />
        <Viewer />
      </div>
      <div className="wrapper-entry">
        <Details />
        <Form />
      </div>
    </div>
  )
}
