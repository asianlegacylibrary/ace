import React, { Component } from 'react'

import { log } from '../store/actions'
import '../assets/css/uv-component.scss'

export default class UVComponent extends Component {

    openManifest = () => {

        log('open sesamanifest', this.uvstate)
        
        this.uv.set(Object.assign({}, this.uvstate, {
            collectionIndex: 0,
            manifestIndex: 0,
            sequenceIndex: 0,
            canvasIndex: 0
        }))

    }

    createUVobj = () => {
        this.urlDataProvider = new window.UV.URLDataProvider()

        let manifest
        if(window.Utils.Urls.getHashParameter('manifest')) {
            manifest = window.Utils.Urls.getHashParameter('manifest') 
        } else {
            manifest = this.props.manifest
        }
            
        log('uvloaded with', manifest)

        this.uvstate = {
            root: this.props.root,
            configUri: this.props.configUri,
            locales: [{ name: 'en-GB' }],
            iiifResourceUri: this.props.manifest,
            collectionIndex: Number(this.urlDataProvider.get('c', 0)),
            manifestIndex: Number(this.urlDataProvider.get('m', 0)),
            sequenceIndex: Number(this.urlDataProvider.get('s', 0)),
            canvasIndex: Number(this.urlDataProvider.get('cv', 0)),
            rotation: Number(this.urlDataProvider.get('r', 0)),
            xywh: this.urlDataProvider.get('xywh', '')
        }

        this.uvEl = document.querySelector('#' + this.props.id || '#uv')
        this.uv = window.createUV(this.uvEl, this.uvstate, this.urlDataProvider)

        this.uv.on('created', () => {
            log('uv created with', this.uvstate)
            window.Utils.Urls.setHashParameter('manifest', this.uvstate.iiifResourceUri)
        })
    }

    setupUV = async () => {

        log('setting up UV with props from App...', this.props)
        // prevent server-side compilation error
        if (typeof window === 'undefined') {
            return
        } else if("UV" in window) {
            // uvLoaded already happened? 
            // event uvLoaded never 'heard' when uv.js is cached (304)
            // problem happens in firefox, sometimes in Chrome / Safari
            log('uv in window, but possibly uvLoaded event will not fire')
            if(this.uvstate === undefined) {
                this.createUVobj()
                return
            }
        }

        window.addEventListener('uvLoaded', (e) => {

            if(this.uvstate === undefined) {
                this.createUVobj()
            }

            log('uvLoaded from event handler', window)
            
        }, false)

    }

    componentDidMount = () => {
        if(this.uvstate === undefined) {
            this.setupUV()
        } else {
            this.openManifest()
        }
    }
    
    // need to look into this lifecycle method
    componentWillUpdate = () => {
        log('will update', this.props.fs)

    }

    componentWillReceiveProps = (nextProps) => {
        
        log('next props', nextProps, 'uvstate', this.uvstate)
        if(this.uvstate === undefined) {
            this.setupUV()

        } else if(this.uvstate.iiifResourceUri !== nextProps.manifest) {
            this.uvstate.iiifResourceUri = nextProps.manifest
            log('we need to load a new manifest', this.props.manifest, nextProps.manifest)
            this.openManifest()

        } else {
            log('next props the same as current')
        }
    }

    render() {
		return (
			<div id="uv" className="uv"></div>
        )
    }

}