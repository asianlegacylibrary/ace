import React from 'react'
import { withNamespaces } from 'react-i18next'

const Forms = ({ t }) => {
    return (
        <div className="wrapper-forms">
            {t('forms.title')}
        </div>
    )
}

export default withNamespaces()(Forms)