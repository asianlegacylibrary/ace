import React from 'react'

import Tabs from './tabs/Tabs'
import { TabVolume } from './tabs/TabVolume'
import { TabCatalog } from './tabs/TabCatalog'
import TabConfig from './tabs/TabConfig'

import '../assets/css/tabs.scss'

const Details = () => {
    return (
        <div className="details">
            <Tabs>
                <TabConfig label="config" />
                <TabVolume label="volume" />
                <TabCatalog label="catalog" />
            </Tabs>
        </div>
    )
}

export default Details