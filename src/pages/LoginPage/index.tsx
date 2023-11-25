import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import COLORS from '@src/theme/colors'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleLogin = () => {}
  const handleNavigateRegister = () => {
    navigate('/register')
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          width: 450,
          height: 500,
          borderRadius: 10,
          gap: 2,
          padding: 6
        }}
      >
        <Typography variant="h4" fontSize={20} fontWeight={800} color="text.primary" sx={{ mb: 8 }}>
          로그인
        </Typography>
        <Stack direction="column" spacing={2} width="100%">
          <TextField
            variant="outlined"
            label="id"
            value={id}
            sx={{ width: '100%' }}
            onChange={e => setId(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="password"
            value={password}
            sx={{ width: '100%' }}
            onChange={e => setPassword(e.target.value)}
          />
        </Stack>
        <Stack direction="row" spacing={2} width="100%">
          <Button variant="text" sx={{ width: '100%', color: COLORS.text }}>
            <Typography variant="body1" fontSize={18} fontWeight={800}>
              로그인
            </Typography>
          </Button>
          <Button variant="text" sx={{ width: '100%', color: COLORS.text }} onClick={handleNavigateRegister}>
            <Typography variant="body1" fontSize={18} fontWeight={800}>
              회원가입
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default LoginPage
