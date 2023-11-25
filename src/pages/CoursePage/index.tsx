import { Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

const CoursePage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
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
            backgroundColor: 'primary.main'
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="body1">실시간 수업</Typography>
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
            backgroundColor: 'secondary.main'
          }}
        >
          <Typography variant="body1">Q&A Archive</Typography>
        </Card>
      </Stack>
    </Box>
  )
}

export default CoursePage
