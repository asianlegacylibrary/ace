import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces, Trans } from 'react-i18next'

import Languages from '../Languages'


// <Trans i18nKey="userMessagesUnread" count={count}>
//     Hello <strong title={t('nameTitle')}>{{name}}</strong>, you have {{count}} unread message. <Link to="/msgs">Go to messages</Link>.
// </Trans>
const TabConfig = (props) => {
    return (
        <ul className="tab-config">
            
            <Trans i18nKey="configuration.intro">
                For now I'll place all config type details 
                in here. Later we can move to proper place. 
                <h5>Language</h5>
            </Trans>
            <Languages />
            <Trans i18nKey="configuration.iiif-server">
                Hello
                <h5>IIIF Server</h5>
                The International Image Interoperability 
                Framework (IIIF) is a protocol for 
                standardized image retrieval created by 
                a community of the world’s leading research 
                libraries, major national libraries and 
                not-for-profit image repositories in an 
                effort to collaboratively produce an 
                interoperable technology and community 
                framework for image delivery.
            </Trans>
        </ul>
    )
}

const withN = new withNamespaces()(TabConfig)
export default connect()(withN)