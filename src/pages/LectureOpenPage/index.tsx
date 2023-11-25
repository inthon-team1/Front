import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const CreateCoursePage: React.FC = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCode, setCourseCode] = useState('');
  // 교수의 이름은 인증 시스템으로부터 받거나 상태로 관리할 수 있습니다.
  // 여기서는 예시로 고정된 값을 사용합니다.
  const professorName = "교수 이름"; // 인증 시스템으로부터 받은 교수 이름

  // 폼 제출을 처리하는 함수
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    // 폼 데이터를 서버에 제출하는 로직을 구현합니다.
    // 예: axios.post('/api/create-course', { courseTitle, courseDescription, courseCode, professorName }).then(...);
    console.log(courseTitle, courseDescription, courseCode, professorName);
  };

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
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        sx={{ marginBottom: 2, width: '500px' }}
        required
      />
      <TextField
        label="강의 설명"
        variant="outlined"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        sx={{ marginBottom: 2, width: '500px' }}
        multiline
        rows={4}
        required
      />
      <TextField
        label="학수번호"
        variant="outlined"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        sx={{ marginBottom: 2, width: '500px' }}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        강의 생성
      </Button>
    </Box>
  );
};

export default CreateCoursePage;
