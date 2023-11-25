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
  return (
    <Box
      sx={{
        position: 'relative',
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
          justifyContent: 'space-between',
          alignItems: 'space-between'
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
