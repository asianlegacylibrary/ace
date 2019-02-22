import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import SearchBar from './SearchBar'
import { phraseTerm } from '../../store/search'
import { checkConnection } from '../../store/es'
import { getRandomInt, SET_CURRENT_ITEM } from '../../store/actions'

class TabSearch extends Component { 
    
    constructor(props) {
        super(props)
        
        this.offsetCurrent = 0

        this.randomVolumes = [
			`bsnyen pa byed tshul gsal`,
			`'khor lo sdom pa`,
			`gsol 'debs thugs rje`,
			`gdan sa chen po`,
			`po'i bsangs dpal`,
			`gdan rabs`
        ]

        this.randomTitles = [
            `SKU SKYES SU MA`,
            `DKAR GSUM`,
            `GNYAN KHROD BRGYA RTZAR`,
            `BYAS PA LAGS`,
            `PO LA BRTEN PA`,
            `GSHONGS CHEN`,
            `SU MA TI`,
            `THAMS CAD MKHYEN PA`,
            `BLO BZANG`
        ]

        this.state = {
            loading: true,
            term: this.randomTitles[getRandomInt(0, this.randomTitles.length - 1)],
            isConnectedState: false,
            esResponse: {},
            searchResults: [],
            currentItem: {}
        }
        
    }

    componentDidMount = async () => {
		try {
			await checkConnection();
			this.setState({ 
                isConnectedState: true,
                loading: false
            }, () => {
				console.log('is connected', this.state.isConnectedState);
				//this.initialize();
            })

            this.child.searchBar.focus();

		} catch (error) {
			this.setState({ isConnectedState: false }, () => {
				console.error('is connected? is c state? ', this.state.isConnectedState);
			});
        }
    }

    search = async (offset) => {
		try {
			console.log(this.state.term, offset)
			const esResponse = await phraseTerm(this.state.term, offset)
            if(esResponse.hits.total === 0) {
				this.setState({
                    esResponse: {},
                    searchResults: [{'_id':'No Results'}]
                })
            } else {
                this.setState({
                    esResponse: esResponse,
                    searchResults: esResponse.hits.hits
                }, () => {
                    console.log(this.state.searchResults)
                })
            }
        } catch(e) {
			console.error('error from search()...', e.status)
			//const esResponse = ['ERROR'];
			if(e.status === 400) {
                console.log('400!')
            }
        }
    }

    render() {
        const list = this.state.searchResults.map(item => {
            return (
                <li key={item['_id']}>
                    <button onClick={() => { 
                        this.setState({ 
                            currentItem: item['_source'] 
                        }, () => {
                            console.log(this.state.currentItem)
                            this.props.dispatch({ type: SET_CURRENT_ITEM, item: this.state.currentItem})
                        })
                        }}>
                        {item['_id']}
                    </button>
                </li>
            )
        })
        return (
            <ul className="tab-search">
                <SearchBar
                    disabled={this.state.loading}
                    ref={(focus) => this.child = focus}
                    initialTerm={this.state.term}
                    onSubmit={term =>
                        this.setState({ 
                            term: term
                        }, () => {
                            this.search(this.offsetCurrent);
                        })
                    }
                    onSearchTermChange={term => 
                        this.setState({ 
                            term: term
                        }, () => {
                            this.search(this.offsetCurrent);
                        })
                    } />
                {list}
            </ul>
        )
    }
}

const withN = new withNamespaces()(TabSearch)
export default connect()(withN)