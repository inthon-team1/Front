import { Box, Stack, Typography } from '@mui/material'
import { useGetArchiveDetail } from '@src/hooks/archive'
import { useParams } from 'react-router-dom'

const ArchivedDetailed = () => {
  const { id } = useParams()
  const paramsId = Number(id)
  const { data } = useGetArchiveDetail(paramsId)
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
          <Stack
            direction="row"
            gap={1}
            sx={{
              display: 'flex',
              width: 500,
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: 2,
              borderRadius: 2,
              backdropFilter: 'blur(25px) saturate(200%)',
              '::WebkitBackdrop': 'blur(25px) saturate(200%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <Stack direction="row" gap={1}>
              <Typography variant="body1" fontWeight={700}>
                Q:
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {archive.questionKR}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography variant="body1" fontWeight={700}>
                A:
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {archive.answerKR}
              </Typography>
            </Stack>
            <audio src={archive.answerFileSrc} controls />
          </Stack>
        ))}
      </Box>
    </Box>
  )
}

export default ArchivedDetailed
