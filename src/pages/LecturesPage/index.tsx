import React from 'react'
import { Box, Card, CardContent, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { useGetLectures } from '@src/hooks/api/lectures'
import type { Lecture } from '@src/models/lecture'

const LecturesPage: React.FC = () => {
  const { data } = useGetLectures()
  const navigate = useNavigate()
  const authUser = useAuthUser()()
  const role = authUser?.role
  const courses = data?.lectures ?? []
  const handleCourseClick = (courseID: string) => {
    navigate(`/course/${courseID}`)
  }
  return (
    <Box sx={{ width: '100%', bgcolor: 'primary', padding: 2 }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 4 }}>
        {courses.map(course => (
          <Card
            key={course.courseID}
            sx={{
              width: 800,
              marginY: 1,
              boxShadow: 1,
              marginX: 'auto'
            }}
            onClick={() => handleCourseClick(course.courseID)}
          >
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                {course.year}-{course.semester} {course.courseID}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: 18 }}>
                {course.titleKR} - {course.descriptionKR}
              </Typography>
              <Typography variant="body2" color="purple">
                담당 교수: {course.lecturerName}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        {role === 'student' ? (
          <Button variant="contained" color="primary" onClick={() => navigate('/course/register')}>
            강의 등록
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => navigate('/course/open')}>
            강의 생성
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default LecturesPage
