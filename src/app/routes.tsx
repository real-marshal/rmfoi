import { useRoutes } from 'react-router-dom'
import { Home, About, Projects, Articles } from '@/pages'
import { lazy } from 'react'

const LazyEmojiSlotMachinePage = lazy(
  () =>
    import(
      /* webpackChunkName: 'emoji-slot-machine' */
      /* webpackPrefetch: true */
      '@/pages/Projects/pages/EmojiSlotMachinePage'
    )
)

const LazyIcePhotoEditorPage = lazy(
  () =>
    import(
      /* webpackChunkName: 'ice-photo-editor' */
      /* webpackPrefetch: true */
      '@/pages/Projects/pages/IcePhotoEditorPage'
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
              element: <LazyEmojiSlotMachinePage />,
            },
            {
              path: 'ice-photo-editor',
              element: <LazyIcePhotoEditorPage />,
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
