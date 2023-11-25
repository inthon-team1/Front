import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuthUser } from 'react-auth-kit'
import { useParams } from 'react-router-dom'
import { type Socket, io } from 'socket.io-client'
import SendIcon from '@mui/icons-material/Send'
interface TextResponse {
  id: number
  status: string
  text: string
}
const ChattingPage = () => {
  const authUser = useAuthUser()()
  const { id } = useParams()
  const [outerSocket, setOuterSocket] = useState<Socket>()
  const [questionId, setQuestionId] = useState<number>(0)
  const sendQuestion = (question: string, lang: string = 'KR') => {
    if (outerSocket) {
      outerSocket.emit('send-question', { question, lang })
    }
  }
  // const [sendAnswerHandler, setSendAnswerHandler] = useState<(file: File, questionId: number) => any>()
  const [question, setQuestion] = useState('')
  const [textResponses, setTextResponses] = useState<TextResponse[]>([])
  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SOCKET}/session`, {
      auth: {
        authorization: `Bearer ${authUser?.token}`
      }
    })
    setOuterSocket(socket)
    if (authUser?.role === 'professor') {
      socket.emit('create-room', { key: id })
    } else {
      socket.emit('join-room', { key: id })
    }
    socket.on('no-room', () => {
      alert('강의 안열려있음')
    })

    socket.on('session-disconnected', () => {
      alert('강의 종료')
    })

    socket.on('send-id', (questionId: number) => {
      setQuestionId(questionId)
    })

    socket.on('error', err => {
      console.log(err)
    })

    // receive-question
    // id = question id
    socket.on('receive-question', (data: { questionKR: string; id: number }) => {
      const newQeustion = { id: data.id, status: 'received', text: data.questionKR }
      setTextResponses(prev => [...prev, newQeustion])
    })

    // send-answer
    // setSendAnswerHandler(function (file: File, questionId: number) {
    //   socket.emit('send-answer', { file, questionId })
    // })

    // receive-answer
    socket.on('receive-answer', (data: { answerKR: string; answerEN: string; fileSrc: string }) => {
      console.log(data)
    })

    socket.on('connect', () => {
      console.log('socket connected')
    })

    socket.on('disconnect', () => {
      //TODO:
    })
    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <Box sx={{ width: '100%', paddingY: 5, paddingX: 50, display: 'flex', flexDirection: 'row' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 700,
          border: 1,
          borderRadius: 3,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          // backdropFilter: 'blur(16px) saturate(200%)',
          // '::WebkitBackdrop': 'blur(16px) saturate(200%)',
          backgroundColor: '#D4E5EF',
          padding: 4,
          gap: 4
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 600,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            // alignItems: 'flex-end',
            gap: 2
          }}
        >
          {textResponses.map(textResponse => (
            <Box
              key={textResponse.id}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: textResponse.status === 'received' ? 'flex-start' : 'flex-end',
                gap: 1
              }}
            >
              {textResponse.status === 'received' && <Avatar sx={{ bgcolor: '#59A7FF' }}>S</Avatar>}
              <Box
                sx={{
                  width: 'auto',
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 1,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                <Typography variant="body1" fontSize={15} fontWeight={800} color="text.primary">
                  {textResponse.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <TextField
            variant="filled"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="질문을 입력하세요."
            sx={{ width: '80%' }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                sendQuestion(question, 'KR')
                setQuestion('')
                setTextResponses(prev => [...prev, { id: questionId, status: 'sent', text: question }])
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ gap: 1, padding: 1, width: '10%' }}
            onClick={() => {
              sendQuestion(question, 'KR')
              setQuestion('')
              setTextResponses(prev => [...prev, { id: questionId, status: 'sent', text: question }])
            }}
          >
            <SendIcon sx={{ color: 'white' }} />
            {/* <Typography variant="body1" color="white">
              등록
            </Typography> */}
          </Button>
        </Box>
      </Box>
    </Box>
    // <>
    //   <TextField
    //     label="강의 이름"
    //     variant="outlined"
    //     value={question}
    //     onChange={e => setQuestion(e.target.value)}
    //     sx={{ marginBottom: 2, width: '500px' }}
    //     required
    //     // onSubmit={() => sendQuestionHandler(question, 'KR')}
    //   />
    //   <Button variant="contained" color="primary" type="submit" onClick={() => sendQuestion(question, 'KR')}>
    //     등록
    //   </Button>
    // </>
  )
}

export default ChattingPage
