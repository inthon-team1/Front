import { Box, Tab, Tabs } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavigationPaths from '@constants/navigation'
import { handleTabsDefault } from '@utils/tabsIndicator'
import { ReactComponent as Logo } from '@assets/Logo.svg'
const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const main = location.pathname === '/'
  const register = location.pathname === '/register'
  const [currentTab, setCurrentTab] = useState(handleTabsDefault(location.pathname))

  useEffect(() => {
    setCurrentTab(NavigationPaths.findIndex(page => page.path === location.pathname))
  }, [location.pathname])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
    navigate(NavigationPaths[newValue].path)
  }

  // const handleClickLogo = () => {
  //   setCurrentTab(0)
  // }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        width: '100vw',
        alignItems: 'center',
        zIndex: 6,
        height: '5vh'
      }}
    >
      <Tabs
        textColor={'inherit'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100vw',
          height: 89,
          paddingX: 25,
          background: main || register ? '#ffffff' : '#D4E5EF',
          borderBottom: 1
        }}
        value={currentTab}
        onChange={handleChange}
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {/* <Logo width={1} height={1} /> */}
        {NavigationPaths.map((navbar, index) => (
          <Tab sx={{ disaply: 'flex', alignSelf: 'center' }} key={index} label={navbar.name} value={index} />
        ))}
      </Tabs>
    </Box>
  )
}

export default Header
