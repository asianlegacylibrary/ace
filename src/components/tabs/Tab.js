import React from 'react'

export const Tab = (props) => {
    const { activeTab, label, onClick } = props;
    let className = 'tab-list-item';
    className = activeTab === label ? className += ' active' : className
    
    return (
      <li className={className} onClick={() => onClick(label)}>
        {label}
      </li>
    )
}