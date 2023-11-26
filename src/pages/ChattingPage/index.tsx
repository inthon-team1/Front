import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useAuthUser } from 'react-auth-kit'
import { useNavigate, useParams } from 'react-router-dom'
import { type Socket, io } from 'socket.io-client'
import SendIcon from '@mui/icons-material/Send'
import { useRecorder } from 'react-recorder-voice'
import MicIcon from '@mui/icons-material/Mic'
import axios from 'axios'
interface TextResponse {
  id: number
  status: string
  text: string
}
const ChattingPage = () => {
  const authUser = useAuthUser()()
  const { courseID, id } = useParams()
  const [outerSocket, setOuterSocket] = useState<Socket>()
  const [questionId, setQuestionId] = useState<number>(0)
  const sendQuestion = (question: string, lang: string = 'KR') => {
    if (outerSocket) {
      outerSocket.emit('send-question', { question, lang })
    }
  }
  const sendAnswerHandler = (file: File, questionId: number) => {
    if (outerSocket) {
      outerSocket.emit('send-answer', { file, questionId })
    }
  }
  const { audioURL, audioData, timer, recordingStatus, cancelRecording, saveRecordedAudio, startRecording } =
    useRecorder()
  const navigate = useNavigate()
  // const [sendAnswerHandler, setSendAnswerHandler] = useState<(file: File, questionId: number) => any>()
  const [question, setQuestion] = useState('')
  const [textResponses, setTextResponses] = useState<TextResponse[]>([])
  const [messages, setMessages] = useState()
  const handleStudentSubmit = () => {
    sendQuestion(question, 'KR')
    setQuestion('')
    setTextResponses(prev => [...prev, { id: questionId, status: 'sent', text: question }])
  }
  const handleProfessorSubmit = () => {
    if (audioData) {
      sendAnswerHandler(audioData, questionId)
      // const formdata = new FormData()
      // formdata.append('file', audioData)
      // axios.post('https://api.inthon.devkor.club/aws', formdata)
    }
  }
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
      socket.disconnect()
      outerSocket?.disconnect()
      navigate(`/course/${courseID}/${id}`)
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
      setQuestionId(data.id)
      setTextResponses(prev => [...prev, newQeustion])
    })

    // receive-answer
    socket.on('receive-answer', (data: { id: number; answerKR: string; fileSrc: string }) => {
      const newQeustion = { id: data.id, status: authUser?.id === 'student' ? 'received' : 'sent', text: data.answerKR }
      setTextResponses(prev => [...prev, newQeustion])
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
    <Box sx={{ width: '100%', overflow: 'auto', paddingY: 5, paddingX: 50, display: 'flex', flexDirection: 'row' }}>
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
            overflow: 'auto',
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
          {authUser?.role === 'professor' && (
            <Box
              onClick={() => {
                timer === 0 ? startRecording() : saveRecordedAudio()
              }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: 'primary.main',
                ':hover': {
                  backgroundColor: 'primary.dark',
                  cursor: 'pointer'
                }
              }}
            >
              <MicIcon sx={{ width: 20, height: 20, color: 'white' }} />
            </Box>
          )}
          {authUser?.role === 'professor' && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 200,
                height: '100%',
                bgcolor: '#59A7FF',
                borderRadius: 3
              }}
            >
              <Typography variant="body1" color="text.primary">
                {timer}
              </Typography>
            </Box>
          )}
          {authUser?.role === 'student' && (
            <TextField
              variant="outlined"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="질문을 입력하세요."
              sx={{
                width: '80%',
                borderRadius: 2,
                backdropFilter: 'blur(16px) saturate(200%)',
                '::WebkitBackdrop': 'blur(16px) saturate(200%)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.125)'
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
                  sendQuestion(question, 'KR')
                  setQuestion('')
                  setTextResponses(prev => [...prev, { id: questionId, status: 'sent', text: question }])
                }
              }}
            />
            // ) : (
            //   <Box
            //     sx={{
            //       display: 'flex',
            //       flexDirection: 'row',
            //       alignItems: 'center',
            //       justifyContent: 'space-between',
            //       width: '100%',
            //       gap: 1
            //     }}
            //   >
            //     <Box
            //       onClick={startRecording}
            //       sx={{
            //         display: 'flex',
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         width: 50,
            //         height: 50,
            //         borderRadius: 25,
            //         backgroundColor: 'primary.main',
            //         ':hover': {
            //           backgroundColor: 'primary.dark',
            //           cursor: 'pointer'
            //         }
            //       }}
            //     >
            //       <MicIcon sx={{ width: 20, height: 20, color: 'white' }} />
            //     </Box>
            //     <Box
            //       sx={{
            //         display: 'flex',
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         width: 200,
            //         height: '100%',
            //         bgcolor: '#59A7FF',
            //         borderRadius: 3
            //       }}
            //     >
            //       <Typography variant="body1" color="text.primary">
            //         {timer}
            //       </Typography>
            //     </Box>
            //   </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ gap: 1, padding: 1, width: '10%' }}
            onClick={() => {
              authUser?.role === 'student' ? handleStudentSubmit() : handleProfessorSubmit()
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
  )
}

export default ChattingPage
