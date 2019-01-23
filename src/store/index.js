import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

const loggerMiddleware = createLogger()


export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware 
        )
    )
)