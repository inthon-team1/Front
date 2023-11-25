import type { RouteObject } from 'react-router-dom'
import {
  //   MainPage,
  Navigation,
  LecturesPage,
  RegisterPage,
  LectureRegisterPage,
  LectureOpenPage,
  HomePage,
  CoursePage
  //   IntroductionPage,
  //   NotFoundPage
} from '@components/Loader/lazy'

const routes: RouteObject[] = [
  {
    path: '',
    element: <Navigation />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/course/:courseID',
        element: <CoursePage />
      },
      {
        path: '/register',
        element: <RegisterPage />
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
      },
      {
        path: '/course/open',
        element: <LectureOpenPage />
      }
    ]
  }
]

export default routes
