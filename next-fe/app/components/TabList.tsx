'use client'

import * as React from 'react'
import { Box, Tab, Tabs } from '@mui/material'

interface TabPanelProps {
  isActive: boolean
  elements: React.ReactNode
  index: number
}

const TabBody = ({ elements, isActive, index, ...other }: TabPanelProps) => (
  <div role="tabpanel" hidden={!isActive} aria-labelledby={`simple-tab-${index}`} {...other}>
    {isActive && <Box sx={{ p: 3 }}>{elements}</Box>}
  </div>
)

const a11yProps = (index: number) => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` })

interface TabListDataObj {
  label: string
  elements: JSX.Element
}

const TabList = ({ dataObjs }: { dataObjs: TabListDataObj[] }) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0)

  const setNewTab = (_event: React.SyntheticEvent, i: number) => setActiveTabIndex(i)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex} onChange={setNewTab} aria-label="tabs" centered>
          {dataObjs.map(({ label }, i) => (
            <Tab label={label} key={label} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {dataObjs.map((thingy, i) => (
        <TabBody isActive={activeTabIndex === i} index={i} key={thingy.label} elements={thingy.elements} />
      ))}
    </Box>
  )
}
export default TabList
