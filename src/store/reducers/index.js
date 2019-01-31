import { combineReducers } from 'redux'

import { 
    initialState,
    DECREMENT, 
    INCREMENT, 
    SET_TAB,
    SET_LANG,
    CURRENT_BG_POS
} from '../actions'

const count = (state = initialState.count, action) => {
    switch (action.type) {
        case DECREMENT:
            return state - 1
        case INCREMENT:
            return state + 1
        default:
            return state
    }
}

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

const viewer = (state = {x:0, y:0}, action) => {
    switch(action.type) {
        case CURRENT_BG_POS:
            return action.viewer
        default:
            return state
    }
}

const rootReducer = combineReducers({
    activeTab,
    selectedLanguage,
    count,
    viewer
})

export default rootReducer


// export const test = (state = {
//     foo: false,
//     count: 0
// }, action) => {
// 	switch(action.type) {
// 		case DECREMENT:
// 			return Object.assign({}, state, {
//                 foo: true,
//                 count: action.count - 1
//             })
//         case INCREMENT:
//             return Object.assign({}, state, {
//                 foo: false,
//                 count: action.count + 1
//             })
// 		default:
// 			return state
// 	}
// }

