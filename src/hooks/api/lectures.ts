import { COMMON_MESSAGE, LECTURE_MESSAGE } from '@src/constants/message'
import { type KoreanLecture, type LectureAPIResponse } from '@src/models/lecture'
import axios, { AxiosError, type AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import { useAuthHeader } from 'react-auth-kit'

import { type UseMutationResult, useMutation, useQuery, useQueryClient } from 'react-query'

export const getLecturesAPICall = async (token: string) => {
  const response = await axios.get<LectureAPIResponse>(`${import.meta.env.VITE_API}/lecture`, {
    headers: { Authorization: token }
  })
  return response.data
}

export const useGetLectures = () => {
  const { enqueueSnackbar } = useSnackbar()
  const token = useAuthHeader()()

  return useQuery(['lectures'], () => getLecturesAPICall(token), {
    onError: err => {
      if (err instanceof AxiosError) {
        enqueueSnackbar(COMMON_MESSAGE.LOAD_FAIL, { variant: 'error' })
        return
      }
      enqueueSnackbar(COMMON_MESSAGE.UNKNOWN_ERROR, { variant: 'error' })
    }
  })
}

export const createLectureAPICall = async (token: string, values: KoreanLecture) => {
  const response = await axios.post<KoreanLecture>(`${import.meta.env.VITE_API}/lecture/KR`, values, {
    headers: { Authorization: token }
  })
  return response.data
}

export const useCreateLecture = (values: KoreanLecture) => {
  const { enqueueSnackbar } = useSnackbar()
  const token = useAuthHeader()()
  const queryClient = useQueryClient()
  return useMutation(['lecture'], () => createLectureAPICall(token, values), {
    onSuccess: () => {
      enqueueSnackbar(LECTURE_MESSAGE.SUCCESS, { variant: 'success' })
      queryClient.invalidateQueries('lectures')
    },
    onError: err => {
      if (err instanceof AxiosError) {
        enqueueSnackbar(LECTURE_MESSAGE.FAILURE, { variant: 'error' })
        return
      }
      enqueueSnackbar(COMMON_MESSAGE.UNKNOWN_ERROR, { variant: 'error' })
    },
    onSettled: () => {
      queryClient.invalidateQueries('lectures')
    }
  })
}

export const deleteLectureAPICall = async (token: string, id: string) => {
  await axios.delete<null, AxiosResponse<null>, null>(`${import.meta.env.VITE_API}/lecture`, {
    params: id,
    headers: { Authorization: token }
  })
}

export const useDeleteLecture = (): UseMutationResult<void, unknown, string, void> => {
  const { enqueueSnackbar } = useSnackbar()

  const token = useAuthHeader()()
  const queryClient = useQueryClient()
  const mutationFn = (values: string) => deleteLectureAPICall(token, values)
  return useMutation(mutationFn, {
    onSuccess: () => {
      enqueueSnackbar(LECTURE_MESSAGE.DELETE_SUCCESS, { variant: 'success' })
    },
    onError: err => {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.response?.data?.message ?? COMMON_MESSAGE.SERVER_ERROR, { variant: 'error' })
        return
      }
      enqueueSnackbar(COMMON_MESSAGE.UNKNOWN_ERROR, { variant: 'error' })
    },
    onSettled: () => {
      queryClient.invalidateQueries('conferences')
    }
  })
}

export const createRegisterLectureAPICall = async (token: string, id: string) => {
  await axios.post<KoreanLecture>(
    `${import.meta.env.VITE_API}/lecture/join`,
    { key: id },
    {
      headers: { Authorization: token }
    }
  )
}

export const useCreateRegisterLecture = (id: string) => {
  const { enqueueSnackbar } = useSnackbar()
  const token = useAuthHeader()()
  return useMutation(['lecture'], () => createRegisterLectureAPICall(token, id), {
    onSuccess: () => {
      enqueueSnackbar(LECTURE_MESSAGE.SUCCESS, { variant: 'success' })
    },
    onError: err => {
      if (err instanceof AxiosError) {
        enqueueSnackbar(LECTURE_MESSAGE.FAILURE, { variant: 'error' })
        return
      }
      enqueueSnackbar(COMMON_MESSAGE.UNKNOWN_ERROR, { variant: 'error' })
    }
  })
}
