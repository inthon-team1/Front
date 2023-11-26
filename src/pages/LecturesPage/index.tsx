import React from 'react'
import { Box, Typography, Button, Grid, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { useGetLectures } from '@src/hooks/api/lectures'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ClassIcon from '@mui/icons-material/Class'
const LecturesPage: React.FC = () => {
  const { data } = useGetLectures()
  const navigate = useNavigate()
  const authUser = useAuthUser()()
  const role = authUser?.role
  const courses = data?.lectures ?? []
  const handleCourseClick = (courseID: string, id: string) => {
    navigate(`/course/${courseID}/${id}`)
  }

  return (
    <Grid
      container
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifySelf: 'center',
        alignSelf: 'center',
        padding: 10
      }}
    >
      <Grid
        item
        lg={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: 1,
          borderRadius: 2,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(16px) saturate(200%)',
          '::WebkitBackdrop': 'blur(16px) saturate(200%)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4
        }}
      >
        <AccountCircleIcon sx={{ width: 100, height: 100 }} />
        <Stack direction="row" gap={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1" fontSize={30} fontWeight={800}>
            {authUser?.name}
          </Typography>
          <Typography variant="body1">님의 강의 목록입니다!</Typography>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          {role === 'student' ? (
            <Button
              sx={{ backgroundColor: '#59A7FF', color: 'white', padding: 1, gap: 1 }}
              onClick={() => navigate('/course/register')}
            >
              <ClassIcon sx={{ color: 'white' }} />
              강의 등록
            </Button>
          ) : (
            <Button sx={{ backgroundColor: '#59A7FF', color: 'white' }} onClick={() => navigate('/course/open')}>
              강의 생성
            </Button>
          )}
        </Box>
      </Grid>
      <Grid
        item
        lg={9}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        {courses.map(course => (
          <Box
            key={course.courseID}
            sx={{
              width: '80%',
              marginBottom: 1,
              border: 1,
              borderRadius: 2,
              borderColor: 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(16px) saturate(200%)',
              '::WebkitBackdrop': 'blur(16px) saturate(200%)',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: 1
            }}
            onClick={() => handleCourseClick(course.courseID, course.id)}
          >
            <Typography variant="subtitle1" component="h2">
              {course.year}-{course.semester} {course.courseID}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontSize: 18, fontWeight: 700 }}>
              {course.titleKR} - {course.descriptionKR}
            </Typography>
            <Typography variant="body2" color="text.primary">
              담당 교수: {course.lecturerName}
            </Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  )
}

export default LecturesPage
