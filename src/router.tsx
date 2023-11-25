import type { RouteObject } from 'react-router-dom'
import {
  MainPage,
  Navigation,
  ProgramPage,
  LocationPage,
  IntroductionPage,
  NotFoundPage
} from '@components/Loader/lazy'

const routes: RouteObject[] = [
  {
    path: '',
    element: <Navigation />,
    children: [
      {
        path: '',
        element: <MainPage />
      },
      {
        path: '/program',
        element: <ProgramPage />
      },
      {
        path: '/location',
        element: <LocationPage />
      },

      {
        path: '/introduction',
        element: <IntroductionPage />
      },
      {
        path: '/*',
        element: <NotFoundPage />
      }
    ]
  }
]

export default routes
