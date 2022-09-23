import { Global } from '@emotion/react'
import { globalStyles } from './global-styles'
import { StrictMode } from 'react'
import { Routes } from './routes'
import { HashRouter } from 'react-router-dom'
import { CSSVariables } from '@/features/Theming'

import 'modern-normalize'

export default function App() {
  return (
    <StrictMode>
      <Global styles={CSSVariables} />
      <Global styles={globalStyles} />
      <HashRouter>
        <Routes />
      </HashRouter>
    </StrictMode>
  )
}
