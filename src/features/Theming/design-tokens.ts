import { light } from './themes/light'
import { designTokensToCSSVarNames } from './utils'

export const dtValues = {
  padding: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '2rem',
  },
  margin: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '16px',
    xl2: '32px',
  },
  gap: {
    sm: '10px',
    md: '20px',
    lg: '40px',
    xl: '80px',
    xl2: '160px',
  },
  fontSize: {
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
  },
  colors: {
    dark: '#010109',
    light: '#F5F9DF',
  },
  mq: {
    big: 'only screen and (min-width: 1200px)',
  },
  z: {
    menu: '1000',
  },
} as const

// Note that the types of this object are not actually true - this object contains CSS var names
// but I like to see the actual values instead
export const dt = designTokensToCSSVarNames({ ...dtValues, theme: light })
