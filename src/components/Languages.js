import React from 'react'
import { connect } from 'react-redux'
import Language from './connectors/Language'
import { withNamespaces } from 'react-i18next'

import '../assets/css/language-list.scss'

// language codes, ISO 639-1
// mongolian - mn, english - en, tibetan - bo
const Languages = (props) => {
    let list = []
    list = Object.entries(props.t('languageCodes')).map(([k, l]) => {
        return (
            <Language key={l} language={k}>
                {l}
            </Language>
        )
    })
    return (
        <ul className="button-list">{list}</ul>
    );
}

const withN = new withNamespaces()(Languages)
export default connect()(withN)
