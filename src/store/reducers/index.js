import { combineReducers } from 'redux'

import { 
    initialState,
    DECREMENT, 
    INCREMENT, 
    SET_TAB 
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

const rootReducer = combineReducers({
    activeTab,
    count
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

