import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import LaunchIIIF from '../connectors/LaunchIIIF'

import '../../assets/css/tabs.scss'

const buildLink = (anchor) => {
    return (
        <span className='bolded'>
            <a 
                target="_blank" 
                rel="noopener noreferrer"
                href={anchor}>{anchor}</a>
        </span>
    )
    
}

const buildListing = (data) => {
    let id, context, manifestType
    if(data == null) {
        return (
            <ul className="tab-volume">
                <li><span className='bolded'>No Volume Loaded</span></li>
            </ul>
        )
    } else {
        id = data['@id']
        context = data['@context']
        manifestType = data['@type']
        return (
            <ul className="tab-volume">
                <li>Type: <span className='bolded'> {manifestType}</span></li>
                <li>Context: {buildLink(context)}</li>
                <li>View Manifest: {buildLink(id)}</li>
            </ul>
        )
    }
}

const TabVolume = ({ data, t }) => {
    return (
        <div>
            {buildListing(data)}
            <h5>{t('configuration.iiif-server-title')}</h5>
            <LaunchIIIF />
            <h5>{t('configuration.iiif-question')}</h5>
            <p>{t('configuration.iiif-server')}</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.manifestData.isFetching ? null : state.manifestData.item
})

const withN = new withNamespaces()(TabVolume)
export default connect(mapStateToProps)(withN)
