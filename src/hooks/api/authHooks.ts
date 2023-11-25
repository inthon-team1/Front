import { AUTH_LOGIN_MESSAGE, AUTH_REGISTER_MESSAGE, COMMON_MESSAGE } from '@src/constants/message'
import axios, { AxiosError, type AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import { useSignIn } from 'react-auth-kit'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

export interface LoginAPIBody {
  username: string | null
  password: string | null
}

export interface LoginAPIResponse extends AxiosResponse {
  token: string
  name: string
  role: string
}

const postLoginAPICall = (values: LoginAPIBody) => async () => {
  return await axios.post<LoginAPIResponse>(`${import.meta.env.VITE_API}/auth/signin`, values)
}

export const useLogin = (values: LoginAPIBody) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const signIn = useSignIn()
  const client = useQueryClient()

  return useMutation(postLoginAPICall(values), {
    onSuccess: ({ data }) => {
      if (
        signIn({
          token: data.token,
          expiresIn: 1000,
          tokenType: 'Bearer',
          authState: { ...data }
        })
      ) {
        client.setQueryData('user', { ...data })
        enqueueSnackbar(`${AUTH_LOGIN_MESSAGE.SUCCESS}, ${data.name} 님!`, { variant: 'success' })
        navigate('/')
      } else enqueueSnackbar(AUTH_LOGIN_MESSAGE.SUCCESS, { variant: 'error' })
    },
    onError: err => {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.response?.data?.message ?? COMMON_MESSAGE.SERVER_ERROR, { variant: 'error' })
        return
      }

      enqueueSnackbar(COMMON_MESSAGE.UNKNOWN_ERROR, { variant: 'error' })
    }
  })
}

export interface RegisterAPIBody {
  username: string | null
  password: string | null
  role: string | null
  name: string | null
}

export interface RegisterAPIResponse extends AxiosResponse {
  token: string
}
const postRegisterAPICall = (values: RegisterAPIBody) => async () => {
  await axios.post<RegisterAPIResponse>(`${import.meta.env.VITE_API}/auth/signup`, values)
}
export const useRegister = (values: RegisterAPIBody) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  return useMutation(postRegisterAPICall(values), {
    onSuccess: () => {
      enqueueSnackbar(AUTH_REGISTER_MESSAGE.SUCCESS, {
        variant: 'success'
      })
      navigate('/')
    },
    onError: err => {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.response?.data?.message ?? AUTH_REGISTER_MESSAGE.SERVER_ERROR, { variant: 'error' })
        return
      }

      enqueueSnackbar(AUTH_REGISTER_MESSAGE.UNKNOWN_ERROR, { variant: 'error' })
    }
  })
}
