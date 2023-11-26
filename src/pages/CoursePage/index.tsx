import { Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
const CoursePage = () => {
  const navigate = useNavigate()
  const { courseID, id } = useParams()
  return (
    <Box
      sx={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Stack direction="row" gap={10}>
        <Card
          sx={{
            width: 200,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(25px) saturate(200%)',
            '::WebkitBackdrop': 'blur(25px) saturate(200%)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }}
          onClick={() => navigate(`/course/${courseID}/chat/${id}`)}
        >
          <CardActionArea sx={{ display: 'flex', height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                gap: 2
              }}
            >
              <QuestionAnswerIcon sx={{ width: 30, height: 30 }} />
              <Typography variant="body1" fontWeight={700}>
                실시간 수업
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            width: 200,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(25px) saturate(200%)',
            '::WebkitBackdrop': 'blur(25px) saturate(200%)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.125)'
          }}
          onClick={() => navigate(`/course/${courseID}/archive`)}
        >
          <CardActionArea sx={{ display: 'flex', height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                gap: 2
              }}
            >
              <CloudDoneIcon sx={{ width: 30, height: 30 }} />
              <Typography variant="body1" fontWeight={700}>
                Q&A Archive
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </Box>
  )
}

export default CoursePage
