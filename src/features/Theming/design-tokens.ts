import { light } from './themes/light'
import { designTokensToCSSVarNames } from './utils'

export const dtValues = {
  padding: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
    xl2: '2rem',
  },
  margin: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '16px',
    xl2: '32px',
  },
  fontSize: {
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
  },
  colors: {
    dark: '#010109',
    light: '#F5F9DF',
    gradient: 'linear-gradient(45deg, #09183d, #32bdc4)',
  },
  screen: {
    big: 'only screen and (min-width: 1200px)',
  },
}

export const dt = designTokensToCSSVarNames({ ...dtValues, theme: light })
