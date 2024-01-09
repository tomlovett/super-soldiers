'use client'

import * as React from 'react'
import { Box, Tab, Tabs } from '@mui/material'

interface TabPanelProps {
  activeTab: string
  elements: React.ReactNode
  label: string
  index: number
}

const TabBody = ({ elements, activeTab, label, index, ...other }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={activeTab !== label}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {label === activeTab && <Box sx={{ p: 3 }}>{elements}</Box>}
  </div>
)

interface TabListDataObj {
  label: string
  elements: JSX.Element
}

const TabList = ({ dataObjs }: { dataObjs: TabListDataObj[] }) => {
  const [activeTab, setActiveTab] = React.useState(dataObjs[0].label)

  const setNewTab = (_event: React.SyntheticEvent, newTabLabel: string) => setActiveTab(newTabLabel)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={setNewTab} aria-label="tabs" centered>
          {dataObjs.map(({ label }) => (
            <Tab label={label} key={label} />
          ))}
        </Tabs>
      </Box>
      {dataObjs.map((thingy, i) => (
        <TabBody activeTab={activeTab} label={thingy.label} index={i} key={thingy.label} elements={thingy.elements} />
      ))}
    </Box>
  )
}
export default TabList
