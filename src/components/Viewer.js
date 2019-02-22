import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { 
    randomIIIFimages, 
    getRandomInt,
    checkIIIFserver,
    bdrc,
    princetonManifest
    } from '../store/actions'

import UVComponent from './UV'

import '../assets/css/index.scss'

const imageIndex = getRandomInt(0, randomIIIFimages.length - 1)
const mediaURL = randomIIIFimages[imageIndex]

console.log(imageIndex, mediaURL)

class Viewer extends Component {

    constructor(props) {
        super(props);
        //this.handleMouseMove = this.debounce(this.handleMouseMove,1000);
        this.state = {
            // backgroundImage: `url(${mediaURL})`,
            // backgroundPosition: '0% 0%',
            // backgroundSize: 'cover',
            // backgroundRepeat: `no-repeat`,
            // clicked: false
            uv: {
				root: "./static/uv",
				configUri: "./static/uv.json",
				manifest: ''
			}
          }
    }

    componentDidMount() {
        this.checkServer()
      }
    
    checkStateOfWindow = () => {
        console.log(window)
    }

    checkServer = async () => {
        const manifest = await checkIIIFserver() 
          ? bdrc[getRandomInt(0, bdrc.length - 1)] 
          : princetonManifest
          
        this.setState(prevState => ({
          uv: {
            ...prevState.uv,
            manifest: manifest
          }
        }), () => {
          console.log('reset manifest', this.state.uv.manifest)
          this.checkStateOfWindow()
        }) 
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
                manifest={this.state.uv.manifest} 
            />
        )
    }
}

export default withNamespaces()(Viewer)
