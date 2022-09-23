import { css } from '@emotion/react'
import { dtValues } from './design-tokens'
import { dark } from './themes/dark'
import { light } from './themes/light'
import { designTokensToCSSVarsStyle } from './utils'

// Injecting CSS variable values
export const CSSVariables = css`
  body {
    ${designTokensToCSSVarsStyle(dtValues)}
  }

  body[data-theme='dark'] {
    ${designTokensToCSSVarsStyle({ theme: dark })}
  }

  body[data-theme='light'] {
    ${designTokensToCSSVarsStyle({ theme: light })}
  }
`
