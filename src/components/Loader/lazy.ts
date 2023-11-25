import { lazy } from 'react'
import Loader from '.'

export const Navigation = Loader(lazy(() => import('src/components/Navigation')))
export const HomePage = Loader(lazy(() => import('@src/pages/HomePage')))
export const LecturesPage = Loader(lazy(() => import('@src/pages/LecturesPage')))
export const LoginPage = Loader(lazy(() => import('@src/pages/LoginPage')))
export const RegisterPage = Loader(lazy(() => import('@src/pages/RegisterPage')))
export const LectureRegisterPage = Loader(lazy(() => import('@src/pages/LectureRegisterPage')))
export const LectureOpenPage = Loader(lazy(() => import('@src/pages/LectureOpenPage')))
// export const LocationPage = Loader(lazy(() => import('@src/pages/LocationPage')))
// export const NotFoundPage = Loader(lazy(() => import('@src/pages/NotFoundPage')))
