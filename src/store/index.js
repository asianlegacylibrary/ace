import { createStore, compose, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './middleware'
import monitorReducersEnhancer from './enhancers'

import rootReducer from './reducers'

// to use the npm package...
//import { createLogger } from 'redux-logger'
//const loggerMiddlewarePlugin = createLogger()


export default function configureStore(preloadedState) {

    let middlewares = []
    let enhancers = []
    if(process.env.NODE_ENV  === 'development') {
        middlewares.push(loggerMiddleware)
        enhancers.push(monitorReducersEnhancer)
    }
    
    middlewares.push(thunkMiddleware)
    const middlewareEnhancer = applyMiddleware(...middlewares)
    enhancers.push(middlewareEnhancer)

    const composedEnhancers = compose(...enhancers)

    const store = createStore(
        rootReducer, 
        preloadedState, 
        composedEnhancers
        )

    return store

}