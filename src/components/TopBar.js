import React from 'react'
import { connect } from 'react-redux'
import '../assets/css/topbar.scss'

const TopBar = (props) => {
    return (
        <ul className="top-bar">
            <li>
                <button 
                    onClick={() => 
                        props.dispatch({type: 'DECREMENT'})}>
                    -
                </button>
            </li>
            <li>{props.count}</li>
            <li>
                <button 
                    onClick={() => 
                        props.dispatch({type: 'INCREMENT'})}>
                    +
                </button>
            </li>
        </ul>
    )
    
}

const mapStateToProps = (state) => ({
    count: state.count
})

export default connect(mapStateToProps)(TopBar)