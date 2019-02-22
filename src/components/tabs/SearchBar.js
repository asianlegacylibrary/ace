import React, { Component } from 'react';

export default class SearchBar extends Component {
    
	constructor(props) {
		super(props);
		this.state = { term: props.initialTerm };
	}
    
	onInputChange(term) {
		this.setState({term});
		//this.props.onSearchTermChange(term);
		//this.props.onSubmit(term);
	}

	onSubmit(key) { 
		if(key === 'Enter') {
			this.props.onSubmit(this.state.term); 
		}
	}

	render() {
		return (
			<div className="search-bar">
				<input
                    ref={(focus) => this.searchBar = focus}
					value={this.state.term}
					onChange={e => this.onInputChange(e.target.value)}
					onSubmit={e => this.onSubmit(e.target.value)}
					onKeyPress={e => this.onSubmit(e.key)}
				/>
			</div>
		);        
	}
}
