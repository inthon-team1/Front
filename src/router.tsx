import type { RouteObject } from 'react-router-dom'
import {
  //   MainPage,
  Navigation,
  LecturesPage,
  LoginPage,
  RegisterPage,
  LectureRegisterPage
  //   IntroductionPage,
  //   NotFoundPage
} from '@components/Loader/lazy'

const routes: RouteObject[] = [
  {
    path: '',
    element: <Navigation />,
    children: [
      {
        path: '',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/lectures',
        element: <LecturesPage />
      },
      // {
      //   path: '/location',
      //   element: <LocationPage />
      // },

      // {
      //   path: '/introduction',
      //   element: <IntroductionPage />
      // },
      // {
      //   path: '/*',
      //   element: <NotFoundPage />
      // }
      {
        path: '/course/register',
        element: <LectureRegisterPage />
      }
    ]
  }
]

export default routes
