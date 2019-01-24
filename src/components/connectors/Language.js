import React from 'react'
import { setLanguage, initialState } from '../../store/actions'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

//{ active, activeTab, children, dispatch, lang, i18n, t }
const Language = ({ language, active, children, dispatch, i18n }) => {

  console.log('Language.js render...')

  const updateLangAndTabs = () => {
    dispatch(setLanguage(language))
    i18n.changeLanguage(language)
  }
  
  return (
    <li
      key={children}
      onClick={() => {
        updateLangAndTabs(language)
        }}
      className={active ? "lang-active" : "lang"}
      style={active ? 
        { color: 'red', } :
        { color: 'black', } 
        }
    >
    <button
      key={children}
      disabled={active ? true : false}
      className="btn-lang">
      {children}
    </button>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  //console.log('mstp language, ', 'state:', state, 'ownProps:', ownProps)
  return {
    active: ownProps.language === state.selectedLanguage,
    language: ownProps.language || initialState.defaultLanguage
  }
}

const withN = new withNamespaces()(Language)
export default connect(mapStateToProps)(withN)
