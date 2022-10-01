import { useRoutes } from 'react-router-dom'
import { Home, About, Projects, Articles, EmojiSlotMachinePage } from '@/pages'

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
          path: 'projects',
          children: [
            {
              index: true,
              element: <Projects />,
            },
            {
              path: 'emoji-slot-machine',
              element: <EmojiSlotMachinePage />,
            },
          ],
        },
        {
          path: 'articles',
          element: <Articles />,
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
  ])
