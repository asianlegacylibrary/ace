import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './assets/css/index.scss'
import './assets/css/overrides.scss'
import configureStore from './store'
import { initialState } from './store/actions'
import { SET_LANG } from './store/types'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

// this is what gives the entire app access to t, i18n...
import './i18n'

import '@fortawesome/fontawesome-pro/css/all.css'

const store = configureStore()

store.dispatch({
    type: SET_LANG, 
    language: initialState.defaultLanguage 
})

const Main = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<Main />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
