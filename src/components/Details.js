import React from 'react'

import Tabs from './tabs/Tabs'
import { TabVolume } from './tabs/TabVolume'
import { TabCatalog } from './tabs/TabCatalog'
import { TabInput } from './tabs/TabInput';
import { TabSearch } from './tabs/TabSearch';

import '../assets/css/tabs.scss'



const Details = (props) => {
    return (
        <div className="details">
            <Tabs>
                <TabVolume label="volume" />
                <TabCatalog label="catalog" />
                <TabInput label="input" />
                <TabSearch label="search" />
            </Tabs>
        </div>
    )
}

export default Details