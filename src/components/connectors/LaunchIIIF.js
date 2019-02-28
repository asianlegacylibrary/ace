import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import { 
    LAUNCH_IIIF, 
    checkIIIFserver,
    parseVolumeManifest, 
    NULLIFY_MANIFEST,
    NULLIFY_SERVER} from '../../store/actions'

import '../../assets/css/tabs.scss'

const LaunchIIIF = ({dispatch, launch, url, fetching, t }) => {
    
    const checkIIIF = () => {
        let l = !launch
        dispatch({type: LAUNCH_IIIF, launch: l})
        if(l) {
            dispatch(checkIIIFserver()).then((response) => {
                dispatch(parseVolumeManifest(response.url))
            })
        } else {
            dispatch({ type: NULLIFY_MANIFEST })
            dispatch({ type: NULLIFY_SERVER })
            window.history.pushState({}, document.title, "/")
        }
    }

    let message = launch ? t('viewer.close') : t('viewer.launch')

    return (
        <ul className="button-list">
            <li>
                <button 
                    className="viewer-btn" 
                    disabled={fetching}
                    onClick={() => checkIIIF() }>
                    {message}
                </button>
            </li>
        </ul>
        
    )
    
}

const mapStateToProps = (state) => ({
    launch: state.launchIIIF,
    url: state.serverIIIF.url,
    fetching: state.serverIIIF.isFetching
})

const withN = new withNamespaces()(LaunchIIIF)
export default connect(mapStateToProps)(withN)