import { lazy } from 'react'
import Loader from '.'

// export const MainPage = Loader(lazy(() => import('@src/pages/HomePage')))
export const Navigation = Loader(lazy(() => import('src/components/Navigation')))
export const LecturesPage = Loader(lazy(() => import('@src/pages/LecturesPage')))
export const LoginPage = Loader(lazy(() => import('@src/pages/LoginPage')))
export const RegisterPage = Loader(lazy(() => import('@src/pages/RegisterPage')))
// export const LocationPage = Loader(lazy(() => import('@src/pages/LocationPage')))
// export const NotFoundPage = Loader(lazy(() => import('@src/pages/NotFoundPage')))
//export const RegistrationPage = Loader(lazy(() => import('@src/pages/RegistrationPage')))