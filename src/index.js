import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './assets/css/index.scss'
import './assets/css/overrides.scss'
import { store } from './store'
import { App } from './components/App'
import * as serviceWorker from './serviceWorker'

// this is what gives the entire app access to t, i18n...
import './i18n'


const Main = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

ReactDOM.render(<Main />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
