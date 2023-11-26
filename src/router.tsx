import type { RouteObject } from 'react-router-dom'
import {
  //   MainPage,
  Navigation,
  LecturesPage,
  RegisterPage,
  LectureRegisterPage,
  LectureOpenPage,
  HomePage,
  CoursePage,
  ChattingPage,
  ArchivePage,
  ArchivedDetailed
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
        path: '/course/:courseID/:id',
        element: <CoursePage />
      },
      {
        path: '/course/:courseID/chat/:id',
        element: <ChattingPage />
      },
      {
        path: '/course/:courseID/archive',
        element: <ArchivePage />
      },
      {
        path: '/course/:courseID/archive/:id',
        element: <ArchivedDetailed />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
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
