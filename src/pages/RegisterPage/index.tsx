import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import COLORS from '@src/theme/colors'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const RegisterPage = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [role, setRole] = useState('' as 'student' | 'professor' | '')
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = () => {
    console.log('hi')
    if (password === passwordCheck) {
      enqueueSnackbar('비밀번호가 일치합니다.', { variant: 'success' })
    } else {
      enqueueSnackbar('비밀번호가 일치하지 않습니다.', { variant: 'error' })
    }
  }
  const handlleClickRole = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const role = e.currentTarget.id
    setRole(role as 'student' | 'professor')
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
        <Typography variant="h4" fontSize={20} fontWeight={800} color="text.primary">
          회원가입
        </Typography>
        <Stack direction="column" spacing={2} width="100%">
          <TextField
            variant="outlined"
            label="아이디"
            value={id}
            sx={{ width: '100%' }}
            onChange={e => setId(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="비밀번호"
            type="password"
            value={password}
            sx={{ width: '100%' }}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="비밀번호 확인"
            type="password"
            value={passwordCheck}
            sx={{ width: '100%' }}
            onChange={e => setPasswordCheck(e.target.value)}
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
            onClick={handlleClickRole}
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
            onClick={handlleClickRole}
          >
            <Typography variant="body1" fontSize={18} fontWeight={800}>
              교수
            </Typography>
          </Button>
        </Stack>
        <Button
          variant="outlined"
          sx={{ width: '100%', height: 50, backgroundColor: 'primary.dark', color: 'primary.light' }}
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
