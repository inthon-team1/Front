import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useCreateLecture } from '@src/hooks/api/lectures'
import { useNavigate } from 'react-router-dom'

const CreateCoursePage: React.FC = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState({
    titleKR: '',
    descriptionKR: '',
    courseID: '',
    year: 0,
    semester: 0,
    section: 0
  })

  const openCourseMutation = useCreateLecture(value)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    openCourseMutation.mutate()
    navigate('/')
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        강의 생성
      </Typography>
      <TextField
        label="강의 이름"
        variant="outlined"
        value={value.titleKR}
        onChange={e => setValue({ ...value, titleKR: e.target.value })}
        sx={{ marginBottom: 2, width: '500px' }}
        required
      />
      <TextField
        label="강의 설명"
        variant="outlined"
        value={value.descriptionKR}
        onChange={e => setValue({ ...value, descriptionKR: e.target.value })}
        sx={{ marginBottom: 2, width: '500px' }}
        multiline
        rows={4}
        required
      />
      <TextField
        label="학수번호"
        variant="outlined"
        value={value.courseID}
        onChange={e => setValue({ ...value, courseID: e.target.value })}
        sx={{ marginBottom: 2, width: '500px' }}
        required
      />
      <TextField
        label="강의년도"
        variant="outlined"
        type="number"
        value={value.year}
        onChange={e => setValue({ ...value, year: parseInt(e.target.value) })}
        sx={{ marginBottom: 2, width: '500px' }}
        required
      />
      <TextField
        label="학기"
        variant="outlined"
        type="number"
        value={value.semester}
        onChange={e => setValue({ ...value, semester: parseInt(e.target.value) })}
        sx={{ marginBottom: 2, width: '500px' }}
        required
      />
      <TextField
        label="분반"
        variant="outlined"
        type="number"
        value={value.section}
        onChange={e => setValue({ ...value, section: parseInt(e.target.value) })}
        sx={{ marginBottom: 2, width: '500px' }}
        required
      />
      <Button variant="contained" color="primary" type="submit" onSubmit={handleSubmit}>
        강의 생성
      </Button>
    </Box>
  )
}

export default CreateCoursePage
