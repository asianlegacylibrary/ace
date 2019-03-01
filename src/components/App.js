import React, { Component } from 'react'
import { connect } from 'react-redux'

// import TopBar from './TopBar'
import Viewer from './Viewer'
import Details from './Details'
import Forms from './Forms'

import { initialState } from '../store/actions'

import '../assets/css/layout-flex.scss'

class App extends Component{

  constructor(props) {
    super(props)
    this.state = {
      full: false
    }
  }
  
  render() {
    console.log(this.state.full)
    return (
      <div>
        <div 
          className="wrapper-view"
          style={{
            height: this.state.full ? '92vh' : '46vh'
          }}
          >
          <button 
            className="viewer-sizer"
            onClick={() => {
              this.setState({
                full: !this.state.full
              }, () => {
                window.dispatchEvent(new Event('resize'))
              })
            }
            }
          >
          <i className="fal fa-arrows"></i>
          </button>
          {/* <TopBar /> */}
          <Viewer fullscreen={this.state.full} />
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
