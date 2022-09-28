import { useRoutes } from 'react-router-dom'
import { Home, About, Projects, Articles } from '@/pages'

export const Routes = () =>
  useRoutes([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          index: true,
          element: null,
        },
        {
          path: '/projects',
          element: <Projects />,
        },
        {
          path: '/articles',
          element: <Articles />,
        },
        {
          path: '/about',
          element: <About />,
        },
      ],
    },
  ])
