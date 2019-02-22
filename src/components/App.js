import React, { Component } from 'react'
import { connect } from 'react-redux'

//import TopBar from './TopBar'
import Viewer from './Viewer'
import Details from './Details'
import Forms from './Forms'

import { initialState } from '../store/actions'

import '../assets/css/layout-flex.scss'

class App extends Component{

  
  render() {
    console.log(this.props.currentItem)
    return (
      <div>
        <div className="wrapper-view">
          {/* <TopBar /> */}
          <Viewer />
        </div>
        <div className="wrapper-entry">
          <Details />
          <Forms searchType={initialState.index} currentItem={this.props.currentItem} />
        </div>
      </div>
    )
  }
  
}
const mapStateToProps = (state) => ({
  currentItem: state.currentItem
})

export default connect(mapStateToProps)(App)
