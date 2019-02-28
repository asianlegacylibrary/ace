import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import UVComponent from './UV'

import '../assets/css/index.scss'

class Viewer extends Component {

    constructor(props) {
        super(props);
        //this.handleMouseMove = this.debounce(this.handleMouseMove,1000);
        this.state = {
            uv: {
				root: "./static/uv",
				configUri: "./static/uv.json",
				//manifest: ''
			}
          }
    }

    debounce = (func, delay) => {
        let inDebounce
        return function() {
            const context = this
            const args = arguments
            clearTimeout(inDebounce)
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }

    render() {
        return (
            <UVComponent
                id="uv" 
                root={this.state.uv.root} 
                configUri={this.state.uv.configUri} 
                manifest={this.props.manifest}//this.state.uv.manifest} 
            />
        )
    }
}

const mapStateToProps = (state) => ({
  manifest: state.serverIIIF.url
})

const withN = new withNamespaces()(Viewer)
export default connect(mapStateToProps)(withN)
