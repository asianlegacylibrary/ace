import React from 'react'
import Tabs from './tabs/Tabs'
import { TabVolume } from './tabs/TabVolume'
import { TabCatalog } from './tabs/TabCatalog'
import { TabInput } from './tabs/TabInput';
import { TabSearch } from './tabs/TabSearch';

import '../assets/css/tabs.scss'

export const Details = () => {
    return (
        <div className="details">
            <Tabs>
                <TabVolume label="Volume" />
                <TabCatalog label="Catalog" />
                <TabInput label="Input" />
                <TabSearch label="Search" />
            </Tabs>
        </div>
    )
}