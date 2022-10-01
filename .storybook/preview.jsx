import { Global } from '@emotion/react'
import { CSSVariables } from '../src/features/Theming'
import { useEffect } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../src/app/store'
import { dark } from '../src/features/Theming/themes/dark'
import { light } from '../src/features/Theming/themes/light'
import 'modern-normalize'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: light.background
      },
      {
        name: 'dark',
        value: dark.background,
      },
    ],
  },
}

const withTheme = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme

  useEffect(() => {
    document.body.dataset['theme'] = theme
  }, [theme])

  return (
    <>
      <Global styles={CSSVariables} />
      <StoryFn />
    </>
  )
}

const withRouter = (StoryFn) => {
  return (
    <MemoryRouter>
      <StoryFn />
    </MemoryRouter>
  )
}

const withProvider = (StoryFn) => {
  return (
    <Provider store={store}>
      <StoryFn />
    </Provider>
  )
}

export const decorators = [withTheme, withRouter, withProvider]

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      showName: true,
    },
  },
}
