import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { initialState } from '../store/actions'
import '../assets/css/forms.scss'

class Forms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shrink: false
        }
    }

    //= ({ t, currentItem, searchType }) => {
    //const b = false
    render() {
        const { currentItem } = this.props
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
        if(initialState.index === "volumes") {
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
        } else if(initialState.index === "titles") {
            title =  c['Full Title (native language)']
            itemID = c['NLM Catalog #']
            author = c[`Author's name (transliterated)`]
            workID = c['Input file number']
            colophon = c['Colophon-tugsguliin ug']
            jsx = (
                <div className="meta">
                    <div className="meta-ids">
                        <p className="meta-id">{itemID}</p>
                        <p className="meta-id">{workID}</p>
                    </div>
                    <div className="meta-items">
                        <div className="meta-author">{author}</div>
                        <div className="meta-title">{title}</div>
                        
                    </div>
                    <p>{colophon}</p>
                </div>
            )
        }
    
        return (
            <div 
                className="wrapper-forms"
                style={{
                    flexBasis: this.state.shrink ? '10vw' : '70vw'
                }}
                >
                <button 
                    className="viewer-sizer"
                    onClick={() => {
                        this.setState({
                            shrink: !this.state.shrink
                        })
                    }}
                >
                <i className="fal fa-arrows"></i>
                </button>
                {jsx}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentItem: state.currentItem
})
const withN = new withNamespaces()(Forms)
export default connect(mapStateToProps)(withN)