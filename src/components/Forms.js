import React from 'react'
import { withNamespaces } from 'react-i18next'

const Forms = ({ t, currentItem, searchType }) => {
    if(Object.keys(currentItem).length === 0) {
        return (
            <div></div>
        )
    }

    const c = currentItem
    let jsx = null
    let title, tibTitle, itemID, nameCataloger, 
        nameDigitizer, imageID, imageDir, output,
        workID, author, colophon
    if(searchType === "volumes") {
        title =  c['Title']
        tibTitle = c['Title in Tibetan']
        itemID = c['NLM Catalog #']
        nameCataloger = c['Name of Cataloger']
        nameDigitizer = c['Name of Digitizer']
        imageID = c['Image RID']
        imageDir = c['ImageDirectory-ID']
        output = c['No, of pages scanned (number of images)']
        jsx = (
            <div className="meta">
                <p className="meta-id">{itemID}</p>
                <p>{`${imageID}, ${imageDir}`}</p>
                <p>{`No, of pages scanned (number of images): ${output}`}</p>
                <h1 className="meta-title">{title}</h1>
                <h2 className="meta-title-tib">{tibTitle}</h2>
                <p>{`Cataloger: ${nameCataloger}`}</p> 
                <p>{`Digitizer: ${nameDigitizer}`}</p> 
            </div>
        )
    } else if(searchType === "titles") {
        title =  c['Full Title (native language)']
        itemID = c['NLM Catalog #']
        author = c[`Author's name (transliterated)`]
        workID = c['Input file number']
        colophon = c['Colophon-tugsguliin ug']
        jsx = (
            <div className="meta">
                <p className="meta-id">{itemID}</p>
                <p>{workID}</p>
                <h1 className="meta-title">{title}</h1>
                <h2 className="meta-author">{author}</h2>
                <p>{colophon}</p>
            </div>
        )
    }
    
    
    return (
        <div className="wrapper-forms">
            {jsx}
        </div>
    )
}

export default withNamespaces()(Forms)