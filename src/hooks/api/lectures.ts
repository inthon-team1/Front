import { COMMON_MESSAGE } from '@src/constants/message'
import { Lecture, type LectureAPIResponse } from '@src/models/lecture'
import axios, { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { useAuthHeader } from 'react-auth-kit'

import { useQuery } from 'react-query'

export const getLecturesAPICall = async (token: string) => {
  const response = await axios.get<LectureAPIResponse>(`${import.meta.env.VITE_API}/lecture`, {
    headers: { Authorization: token }
  })
  return response.data
}

export const useGetLectures = () => {
  const { enqueueSnackbar } = useSnackbar()
  const token = useAuthHeader()()

  return useQuery(['lecture'], () => getLecturesAPICall(token), {
    onError: err => {
      if (err instanceof AxiosError) {
        enqueueSnackbar(COMMON_MESSAGE.LOAD_FAIL, { variant: 'error' })
        return
      }
      enqueueSnackbar(COMMON_MESSAGE.UNKNOWN_ERROR, { variant: 'error' })
    }
  })
}
