import { COMMON_MESSAGE } from '@src/constants/message'
import axios, { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { useAuthHeader } from 'react-auth-kit'
import { useQuery } from 'react-query'

interface Lecturer {
  id: number
  username: string
  name: string
}
interface ArchivedLecture {
  id: string
  titleKR: string
  descriptionKR: string
  titleEN: string
  descriptionEN: string
  courseID: string
  year: number
  semester: number
  section: number
  lecturer: Lecturer
}
export interface ArchiveAPIResponse {
  id: number
  dateString: string
  number: 1
  lecture: ArchivedLecture
}

const getArchives = async (token: string) => {
  const res = await axios.get<ArchiveAPIResponse[]>(`${import.meta.env.VITE_API}/session`, {
    headers: { Authorization: token }
  })
  return res.data
}

export const useGetArchives = () => {
  const token = useAuthHeader()()
  const { enqueueSnackbar } = useSnackbar()
  return useQuery(['archive'], () => getArchives(token), {
    onError: err => {
      if (err instanceof AxiosError) {
        enqueueSnackbar(COMMON_MESSAGE.LOAD_FAIL, { variant: 'error' })
        return
      }
      enqueueSnackbar(COMMON_MESSAGE.UNKNOWN_ERROR, { variant: 'error' })
    }
  })
}

interface getArchiveDetailProps {
  questionKR: string
  answerKR: string
  answerFileSrc: string
}
const getArchiveDetail = async (token: string, id: number) => {
  const res = await axios.get<getArchiveDetailProps[]>(`${import.meta.env.VITE_API}/session/questions/${id}`, {
    headers: { Authorization: token }
  })
  return res.data
}

export const useGetArchiveDetail = (id: number) => {
  const token = useAuthHeader()()
  const { enqueueSnackbar } = useSnackbar()
  return useQuery(['archive'], () => getArchiveDetail(token, id), {
    onError: err => {
      if (err instanceof AxiosError) {
        enqueueSnackbar(COMMON_MESSAGE.LOAD_FAIL, { variant: 'error' })
        return
      }
      enqueueSnackbar(COMMON_MESSAGE.UNKNOWN_ERROR, { variant: 'error' })
    }
  })
}
