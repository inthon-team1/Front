import { Box, Tab, Tabs } from '@mui/material'
import NavigationPaths from '@constants/navigation'
interface HeaderTabsProps {
  currentTab: number
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
}

const HeaderTabs = ({ currentTab, handleChange }: HeaderTabsProps) => {
  return (
    <Box sx={{ marginLeft: 'auto' }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        textColor={'inherit'}
        indicatorColor={'primary'}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {NavigationPaths.map((navbar, index) => (
          <Tab key={index} label={navbar.name} value={index} />
        ))}
      </Tabs>
    </Box>
  )
}

export default HeaderTabs
