import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { type RegisterAPIBody, useRegister } from '@src/hooks/api/authHooks'
import { useEffect, useState } from 'react'

const RegisterPage = () => {
  // const [value, setValue] = useState<RegisterAPIBody>({
  //   username: null,
  //   password: null,
  //   role: null,
  //   name: null
  // })

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [name, setName] = useState<string>('')

  const registerMutation = useRegister({ username, password, role, name })
  // const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
  //   const newValues = {
  //     ...value,
  //     [event.target.name]: event.target.value
  //   }
  //   setValue(newValues)
  // }

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
          backgroundColor: 'primary.main',
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
              backgroundColor: role === 'student' ? 'primary.light' : '',
              color: role === 'student' ? 'text.primary' : 'text.secondary'
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
              backgroundColor: role === 'professor' ? 'primary.light' : '',
              color: role === 'professor' ? 'text.primary' : 'text.secondary'
            }}
            onClick={handleClickButton}
          >
            <Typography variant="body1" fontSize={18} fontWeight={800}>
              교수
            </Typography>
          </Button>
        </Stack>
        <Button
          variant="outlined"
          sx={{ width: '100%', height: 50, backgroundColor: 'primary.dark', color: 'primary.light' }}
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
