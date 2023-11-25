import { Box, styled, useTheme } from '@mui/material'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'

const ThemeWrapper = styled(Box)(
  () => `
        position: relative;
        z-index: 5;
        display: block;
        flex: 1;
        min-width: 0;
    `
)

const Navigation = () => {
  const theme = useTheme()
  const location = useLocation()

  const mainPage = location.pathname === '/'

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: mainPage ? theme.palette.background.default : theme.palette.background.paper,
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        width: '100vw'
      }}
    >
      <Box
        width="100vw"
        minHeight="100vh"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Header />
        <ThemeWrapper>
          <Outlet />
        </ThemeWrapper>
      </Box>
    </Box>
  )
}

export default Navigation
