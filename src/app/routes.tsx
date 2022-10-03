import { useRoutes } from 'react-router-dom'
import { Home, About, Projects, Articles } from '@/pages'
import { lazy } from 'react'

const LazyEmojiSlotMachine = lazy(
  () =>
    import(
      /* webpackChunkName: 'emoji-slot-machine' */
      /* webpackPrefetch: true */
      '@/pages/Projects/pages/EmojiSlotMachinePage'
    )
)

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
              element: <LazyEmojiSlotMachine />,
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
