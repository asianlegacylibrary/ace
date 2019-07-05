import { combineReducers } from 'redux'
import { initialState } from '../actions'
import * as types from '../types'

const activeTab = (state = initialState.activeTab, action) => {
    switch(action.type){
        case types.SET_TAB:
            return action.tab
        default:
            return state
    }
}

const selectedLanguage = (state = initialState.defaultLanguage, action) => {
    switch(action.type){
        case types.SET_LANG:
            return action.language
        default:
            return state
    }
}

const currentItem = (state = {}, action) => {
    switch(action.type) {
        case types.SET_CURRENT_ITEM:
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
        case types.CURRENT_BG_POS:
            return action.viewer
        default:
            return state
    }
}

const launchIIIF = (state = false, action) => {
    switch(action.type) {
        case types.LAUNCH_IIIF:
            return action.launch
        default:
            return state
    }
}

const serverIIIF = (state = { isFetching: false, url: ''}, action) => {
    switch(action.type) {
        case types.REQUEST_SERVER:
            return Object.assign({}, state, {
                isFetching: true
            }) 
        case types.RECEIVE_SERVER:
            return Object.assign({}, state, {
                isFetching: false,
                url: action.url,
                server: action.server,
                resource: action.resource,
                lastUpdated: action.receivedAt
            })
        case types.NULLIFY_SERVER:
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
        case types.REQUEST_MANIFEST:
            return Object.assign({}, state, {
                isFetching: true
            }) 
        case types.RECEIVE_MANIFEST:
            return Object.assign({}, state, {
                isFetching: false,
                item: action.item,
                lastUpdated: action.receivedAt
            })
        case types.RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                url: action.url
            }) 
        case types.NULLIFY_MANIFEST:
            return Object.assign({}, state, {
                isFetching: false,
                item: null,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}
 
// this is the shape of the data
const rootReducer = combineReducers({
    activeTab,
    currentItem,
    launchIIIF,
    manifestData,
    selectedLanguage,
    serverIIIF,
    viewer
})

export default rootReducer
