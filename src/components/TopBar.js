import React from 'react'

import logo from '../assets/img/acip_logo.svg'
import '../assets/css/topbar.scss'

const TopBar = () => {
    return (
        <div className="top-bar">
            <img src={logo} alt="logo" height="30px" />
        </div>
    )
    
}

export default TopBar