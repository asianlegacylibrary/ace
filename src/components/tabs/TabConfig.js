import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import Languages from '../Languages'

const TabConfig = ({ t }) => {
    return (
        <ul className="tab-config">
            <p>{t('configuration.intro')}</p>
            <h5>{t('configuration.language')}</h5>
            <Languages />
        </ul>
    )
}

const withN = new withNamespaces()(TabConfig)
export default connect()(withN)