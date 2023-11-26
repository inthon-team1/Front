import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useCreateRegisterLecture } from '@src/hooks/api/lectures'
import { useNavigate } from 'react-router-dom'

const LectureRegisterPage: React.FC = () => {
  const [hash, setHash] = useState('')
  const navigate = useNavigate()
  const createLectureMutation = useCreateRegisterLecture(hash)
  // 해시 코드 변경을 처리하는 함수
  const handleHashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value)
  }

  // 해시 코드 제출을 처리하는 함수
  const handleRegister = () => {
    if (hash === '') return
    createLectureMutation.mutate()
    navigate('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 500,
          height: 300,
          borderRadius: 3,
          backdropFilter: 'blur(16px) saturate(200%)',
          '::WebkitBackdrop': 'blur(16px) saturate(200%)',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 4 }}>
          강의 등록
        </Typography>
        <TextField
          label="강의 코드"
          variant="outlined"
          value={hash}
          onChange={handleHashChange}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#59A7FF', color: 'white', padding: 1, gap: 1 }}
          onClick={handleRegister}
        >
          등록
        </Button>
      </Box>
    </Box>
  )
}

export default LectureRegisterPage
