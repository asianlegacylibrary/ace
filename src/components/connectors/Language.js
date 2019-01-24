import React from 'react'
import { setLanguage, initialState } from '../../store/actions'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

//{ active, activeTab, children, dispatch, lang, i18n, t }
const Language = (props) => {

  console.log('from lang', props)

  const updateLangAndTabs = (lng) => {
    props.dispatch(setLanguage(props.lang))
    props.i18n.changeLanguage(lng)
  }
  
  return (
    <li
      key={props.children}
      onClick={() => {
        updateLangAndTabs(props.lang)
        }}
      className={props.active ? "lang-active" : "lang"}
      style={props.active ? 
        { color: 'red', } :
        { color: 'black', } 
        }
    >
    <button
      key={props.children}
      disabled={props.active ? true : false}
      className="btn-lang">
      {props.children}
    </button>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('mstp language, ', 'state:', state, 'ownProps:', ownProps)
  return {
    active: ownProps.selectedLanguage === state.selectedLanguage,
    lang: ownProps.selectedLanguage || initialState.defaultLanguage,
    activeTab: state.activeTab || initialState.activeTab
  }
}

const withN = new withNamespaces()(Language)
export default connect(mapStateToProps)(withN)
