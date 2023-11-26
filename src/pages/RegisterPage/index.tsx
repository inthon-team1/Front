import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useRegister } from '@src/hooks/api/authHooks'
import COLORS from '@src/theme/colors'
import { useState } from 'react'

const RegisterPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [name, setName] = useState<string>('')

  const registerMutation = useRegister({ username, password, role, name })

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRole(e.currentTarget.id)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    registerMutation.mutate()
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
          backdropFilter: 'blur(25px) saturate(200%)',
          '::WebkitBackdrop': 'blur(25px) saturate(200%)',
          backgroundColor: 'rgba(255, 255, 255, 0.58)',
          width: 450,
          height: 500,
          borderRadius: 10,
          gap: 2,
          padding: 4
        }}
      >
        <Typography variant="h4" fontSize={20} fontWeight={800} color="text.primary">
          회원가입
        </Typography>
        <Stack direction="column" spacing={2} width="100%">
          <TextField
            variant="outlined"
            label="이름"
            value={name}
            sx={{ width: '100%' }}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="아이디"
            value={username}
            sx={{ width: '100%' }}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="비밀번호"
            type="password"
            value={password}
            sx={{ width: '100%' }}
            onChange={e => setPassword(e.target.value)}
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <Button
            id="student"
            variant="outlined"
            sx={{
              width: '100%',
              backgroundColor: role === 'student' ? 'primary.main' : '',
              color: role === 'student' ? 'white' : 'text.secondary',
              ':hover': {
                backgroundColor: role === 'student' ? 'primary.main' : 'primary.light'
              }
            }}
            onClick={handleClickButton}
          >
            <Typography variant="body1" fontSize={18} fontWeight={800}>
              학생
            </Typography>
          </Button>
          <Button
            id="professor"
            variant="outlined"
            sx={{
              width: '100%',
              backgroundColor: role === 'professor' ? 'primary.main' : '',
              color: role === 'professor' ? 'white' : 'text.secondary',
              ':hover': {
                backgroundColor: role === 'professor' ? 'primary.main' : 'primary.light'
              }
            }}
            onClick={handleClickButton}
          >
            <Typography variant="body1" fontSize={18} fontWeight={800}>
              교수
            </Typography>
          </Button>
        </Stack>
        <Button
          variant="text"
          sx={{
            width: '100%',
            color: COLORS.text,
            height: 50
          }}
          onClick={handleSubmit}
        >
          <Typography variant="body1" fontSize={18} fontWeight={800}>
            회원가입
          </Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default RegisterPage
