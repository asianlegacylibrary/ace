import React, { Component } from 'react'
import { connect } from 'react-redux'

// import TopBar from './TopBar'
import Viewer from './Viewer'
import Details from './Details'
import Forms from './Forms'

import '../assets/css/layout-flex.scss'
import tinylogo from '../assets/img/acip_logo.svg'

class App extends Component{

  constructor(props) {
    super(props)
    this.state = {
      size: 'medium',
      viewer: { small: '16', medium: '46', large: '92' },
      entry: { small: '84', medium: '54', large: '8' }
    }
  }

  setViewerSize = (direction) => {
    let size
    switch(this.state.size) {
      case 'small':
        size = direction === 'decrease' ? null : 'medium'
        break
      case 'medium':
        size = direction === 'decrease' ? 'small' : 'large'
        break
      case 'large':
        size = direction === 'increase' ? null : 'medium'
        break
      default:
        size = null
    }

    if(size === null) { return null }

    this.setState({
      size: size
    }, () => {
      window.dispatchEvent(new Event('resize'))
    })

  }
  
  render() {
    return (
      <div>
        <div 
          className="wrapper-view"
          style={{
            height: `${this.state.viewer[this.state.size]}vh`
          }}
          >
          <img className="logo-background" src={tinylogo} alt="ACIP logo" />
          <button 
            className="viewer-sizer smaller"
            onClick={() => this.setViewerSize('decrease')}
            disabled={this.state.size === 'small'}
          >
            <i className="fal fa-angle-up fa-2x"></i>
          </button>
          <button 
            className="viewer-sizer bigger"
            onClick={() => this.setViewerSize('increase')}
            disabled={this.state.size === 'large'}
          >
          <i className="fal fa-angle-down fa-2x"></i>
          </button>
          {/* <TopBar /> */}
          <Viewer />
        </div>
        <div 
          className="wrapper-entry"
          style={{
            height: `${this.state.entry[this.state.size]}vh`
          }}
        >
          <Details />
          <Forms />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentItem: state.currentItem
})

export default connect(mapStateToProps)(App)
