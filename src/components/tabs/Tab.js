import React from 'react'

const Tab = (props) => {
    const { activeTab, label, onClick, labelKey } = props;
    let className = 'tab-list-item'
    className = labelKey === activeTab ? 'tab-list-item active' : 'tab-list-item'
    
    return (
      <li className={className} onClick={() => onClick(label)}>
        {label}
      </li>
    )
}

export default Tab