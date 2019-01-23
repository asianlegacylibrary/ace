import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from './Tab'
import { SET_TAB } from '../../store/actions';

class Tabs extends Component {

  onClickTabItem = (tab) => {
    this.props.dispatch({type: SET_TAB, tab: tab})
  }

  render() {
    const { children, activeTab } = this.props
    return (
      <div className="tabs">
        <ul className="tab-list">
            {
            children.map((child) => {
                const { label } = child.props;
                return (
                    <Tab
                        activeTab={activeTab}
                        key={label}
                        label={label}
                        onClick={this.onClickTabItem}
                    />
                )
            })
            }
        </ul>

        <div className="tab-content">
            { children.map((x) => {
                return x.props.label !== activeTab ? undefined : x
            }) }
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        activeTab: state.activeTab
    }
}

export default connect(mapStateToProps)(Tabs)