import { Box, Button, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from '@assets/Logo.svg'
import { useAuthUser, useSignOut } from 'react-auth-kit'
import logoUrl from '@assets/Logo.svg'
const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const main = location.pathname === '/'
  const register = location.pathname === '/register'
  const authUser = useAuthUser()()
  const signOut = useSignOut()

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        width: '100vw',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 6,
        height: 70,
        paddingX: 30,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Button sx={{ display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
        <img src={logoUrl} alt="logo" width="50" height="50" />
      </Button>
      {authUser && (
        <Button variant="contained" sx={{ display: 'flex' }} onClick={() => signOut()}>
          <Typography variant="body1" fontSize={15} fontWeight={800}>
            로그아웃
          </Typography>
        </Button>
      )}
    </Box>
  )
}

export default Header
