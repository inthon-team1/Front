import React from 'react'
import { Box, Card, CardContent, Typography, Button, Grid, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { useGetLectures } from '@src/hooks/api/lectures'
import { useRecorder } from 'react-recorder-voice'
import MicIcon from '@mui/icons-material/Mic'
import CloseIcon from '@mui/icons-material/Close'
const LecturesPage: React.FC = () => {
  const { data } = useGetLectures()
  const navigate = useNavigate()
  const authUser = useAuthUser()()
  const role = authUser?.role
  const courses = data?.lectures ?? []
  const handleCourseClick = (courseID: string, id: string) => {
    navigate(`/course/${courseID}/${id}`)
  }
  // const { audioURL, audioData, timer, recordingStatus, cancelRecording, saveRecordedAudio, startRecording } =
  //   useRecorder()
  return (
    <Grid container sx={{ width: '100%', display: 'flex', flexDirection: 'row', padding: 2 }}>
      <Grid
        item
        lg={3}
        sx={{
          border: 1,
          borderRadius: 2,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(16px) saturate(200%)',
          '::WebkitBackdrop': 'blur(16px) saturate(200%)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }}
      >
        <Stack direction="row" gap={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1" fontSize={30} fontWeight={800}>
            {authUser?.name}
          </Typography>
          <Typography variant="body1">님의 강의 목록입니다!</Typography>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          {role === 'student' ? (
            <Button sx={{ backgroundColor: '#59A7FF', color: 'white' }} onClick={() => navigate('/course/register')}>
              강의 등록
            </Button>
          ) : (
            <Button sx={{ backgroundColor: '#59A7FF', color: 'white' }} onClick={() => navigate('/course/open')}>
              강의 생성
            </Button>
          )}
          {/* <Box sx={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#59A7FF' }}> */}
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#59A7FF'
            }}
            onClick={startRecording}
          >
            <MicIcon sx={{ color: 'white' }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#59A7FF'
            }}
            onClick={cancelRecording}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Box>
          <button onClick={saveRecordedAudio}>Stop and Save</button>
          <audio controls src={audioURL}></audio> */}
        </Box>
        {/* <button onClick={cancelRecording}>Cancel</button>
            <button onClick={saveRecordedAudio}>Stop and Save</button>
            <audio controls src={audioURL}></audio> */}
      </Grid>
      <Grid
        item
        lg={9}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        {courses.map(course => (
          <Box
            key={course.courseID}
            sx={{
              width: 800,
              marginBottom: 1,
              marginX: 'auto',
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
            <Typography variant="subtitle2" sx={{ fontSize: 18 }}>
              {course.titleKR} - {course.descriptionKR}
            </Typography>
            <Typography variant="body2" color="purple">
              담당 교수: {course.lecturerName}
            </Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  )
}

export default LecturesPage
