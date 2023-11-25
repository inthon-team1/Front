import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const RegistrationtPage: React.FC = () => {
  const [hash, setHash] = useState('');

  // 해시 코드 변경을 처리하는 함수
  const handleHashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value);
  };

  // 해시 코드 제출을 처리하는 함수
  const handleRegister = () => {
    // 해시 코드를 사용하여 강의 등록 로직을 여기에 구현합니다.
    // 이 예시에서는 콘솔에 출력만 하고 있습니다.
    console.log('Registering course with hash:', hash);
    // 실제로는 서버에 강의 등록 요청을 보내는 코드가 들어가야 합니다.
    // 예: axios.post('/api/register-course', { hash }).then(...);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        강의 등록
      </Typography>
      <TextField
        label="해쉬 코드"
        variant="outlined"
        value={hash}
        onChange={handleHashChange}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        등록
      </Button>
    </Box>
  );
};

export default RegistrationtPage;
