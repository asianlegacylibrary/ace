import React from 'react'
import { withNamespaces } from 'react-i18next'
import { randomIIIFimages, getRandomInt } from '../store/actions'
import '../assets/css/index.scss'

const imageIndex = getRandomInt(0, randomIIIFimages.length)
const mediaURL = randomIIIFimages[imageIndex]

console.log(imageIndex, mediaURL)

const Viewer = ({ t }) => {
    return (
        <div 
            className="viewer"
            style={{
                backgroundImage: 
                  `url(${mediaURL})`
              }}>
            {t("viewer.title")}
        </div>
    )
}

export default withNamespaces()(Viewer)
