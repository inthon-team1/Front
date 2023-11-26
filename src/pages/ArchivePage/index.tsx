import { Box, Typography } from '@mui/material'
import { useGetArchives } from '@src/hooks/archive'
import { useNavigate, useParams } from 'react-router-dom'

const ArchivePage = () => {
  const { data } = useGetArchives()
  const changeDateFormat = (date: string) => {
    const dates = date.split('-')
    return `${dates[0]}년 ${dates[1]}월 ${dates[2]}일`
  }
  const { courseID } = useParams()
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'auto',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        {data?.map(archive => (
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backdropFilter: 'blur(16px) saturate(200%)',
              '::WebkitBackdrop': 'blur(16px) saturate(200%)',
              backgroundColor: 'rgba(225, 225, 225, 0.5)'
            }}
            key={archive.id}
            onClick={() => navigate(`/course/${courseID}/archive/${archive.id}`)}
          >
            <Typography variant="body1" fontWeight={700}>
              {changeDateFormat(archive.dateString)}
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {archive.number}회차 수업입니다!
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ArchivePage
