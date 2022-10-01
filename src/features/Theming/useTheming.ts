import { useEffect } from 'react'
import { useMediaQuery } from '@/hooks'
import { actions, selectActualTheme } from './store'
import { useAppSelector, useAppDispatch } from '@/app/store'
import { SYSTEM_THEME_FALLBACK, ThemeValue } from './constants'

export const useTheming = () => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)')

  const systemTheme =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (prefersDark && ThemeValue.DARK) || (prefersLight && ThemeValue.LIGHT) || SYSTEM_THEME_FALLBACK

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(actions.setSystemTheme(systemTheme))
  }, [dispatch, systemTheme])

  const theme = useAppSelector(selectActualTheme)

  useEffect(() => {
    document.body.dataset['theme'] = theme
  }, [theme])
}
