import { combineReducers } from 'redux'

import { 
    initialState,
    SET_TAB,
    SET_LANG,
    SET_CURRENT_ITEM,
    LAUNCH_IIIF,
    CURRENT_BG_POS,
    REQUEST_SERVER,
    RECEIVE_SERVER,
    NULLIFY_SERVER,
    REQUEST_MANIFEST,
    RECEIVE_MANIFEST,
    NULLIFY_MANIFEST,
    RECEIVE_ERROR
} from '../actions'


const activeTab = (state = initialState.activeTab, action) => {
    switch(action.type){
        case SET_TAB:
            return action.tab
        default:
            return state
    }
}

const selectedLanguage = (state = initialState.defaultLanguage, action) => {
    switch(action.type){
        case SET_LANG:
            return action.language
        default:
            return state
    }
}

const currentItem = (state = {}, action) => {
    switch(action.type) {
        case SET_CURRENT_ITEM:
            return Object.assign({}, state, {
                source: action.source,
                index: action.index,
                highlight: action.highlight
            }) 
            //return action.item 
        default:
            return state
    }
}

const viewer = (state = {x:0, y:0}, action) => {
    switch(action.type) {
        case CURRENT_BG_POS:
            return action.viewer
        default:
            return state
    }
}

const launchIIIF = (state = false, action) => {
    switch(action.type) {
        case LAUNCH_IIIF:
            return action.launch
        default:
            return state
    }
}

const serverIIIF = (state = { isFetching: false, url: ''}, action) => {
    switch(action.type) {
        case REQUEST_SERVER:
            return Object.assign({}, state, {
                isFetching: true
            }) 
        case RECEIVE_SERVER:
            return Object.assign({}, state, {
                isFetching: false,
                url: action.url,
                server: action.server,
                resource: action.resource,
                lastUpdated: action.receivedAt
            })
        case NULLIFY_SERVER:
            return Object.assign({}, state, {
                isFetching: false,
                url: '',
                server: null,
                resource: null,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

const manifestData = (state = { isFetching: false, item: null }, action) => {
    switch(action.type) {
        case REQUEST_MANIFEST:
            return Object.assign({}, state, {
                isFetching: true
            }) 
        case RECEIVE_MANIFEST:
            return Object.assign({}, state, {
                isFetching: false,
                item: action.item,
                lastUpdated: action.receivedAt
            })
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                url: action.url
            }) 
        case NULLIFY_MANIFEST:
            return Object.assign({}, state, {
                isFetching: false,
                item: null,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}
 
const rootReducer = combineReducers({
    activeTab,
    selectedLanguage,
    viewer,
    launchIIIF,
    serverIIIF,
    manifestData,
    currentItem
})

export default rootReducer
