import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useLogin } from '@src/hooks/api/authHooks'
import COLORS from '@src/theme/colors'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const handleNavigateRegister = () => {
    navigate('/register')
  }

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const loginMutation = useLogin({ username, password })

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    loginMutation.mutate()
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
          padding: 4
        }}
      >
        <Typography variant="h4" fontSize={20} fontWeight={800} color="text.primary" sx={{ mb: 8 }}>
          로그인
        </Typography>
        <Stack direction="column" spacing={2} width="100%">
          <TextField
            variant="outlined"
            label="id"
            value={username}
            sx={{ width: '100%' }}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="password"
            type="password"
            value={password}
            sx={{ width: '100%' }}
            onChange={e => setPassword(e.target.value)}
          />
        </Stack>
        <Stack direction="row" spacing={2} width="100%">
          <Button variant="text" sx={{ width: '100%', color: COLORS.text }} onClick={e => handleSubmit(e)}>
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
