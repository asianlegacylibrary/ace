import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import Tab from './Tab'
import { SET_TAB } from '../../store/actions'

class Tabs extends Component {

  onClickTabItem = (tab) => {
    this.props.dispatch({type: SET_TAB, tab: tab})
  }

  render() {
    const { children, activeTab, t } = this.props
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
                        labelKey={label}
                        label={t('tabs')[label]}
                        handleIIIF={() => this.handleViewer()}
                        onClick={() => this.onClickTabItem(label)}
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

const withN = new withNamespaces()(Tabs)
export default connect(mapStateToProps)(withN)