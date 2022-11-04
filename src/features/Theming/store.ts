import type { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SystemThemeValue, SYSTEM_THEME_FALLBACK, ThemeValue } from './constants'
import storage from 'redux-persist/lib/storage'
import { PersistConfig, persistReducer } from 'redux-persist'

const NAME = 'theme' as const
interface ThemeState {
  currentTheme: ThemeValue
  systemTheme: SystemThemeValue
}

const initialState: ThemeState = {
  currentTheme: ThemeValue.SYSTEM,
  systemTheme: SYSTEM_THEME_FALLBACK,
}

const persistConfig: PersistConfig<ThemeState> = {
  key: NAME,
  storage,
} as const

/*

REDUCERS

*/

const { actions, reducer } = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setCurrentTheme: (state, action: PayloadAction<ThemeValue>) => {
      state.currentTheme = action.payload
    },
    setSystemTheme: (state, action: PayloadAction<SystemThemeValue>) => {
      state.systemTheme = action.payload
    },
  },
})

export { actions, reducer }
export const themeReducer = persistReducer(persistConfig, reducer)

/*

SELECTORS

*/

export const selectCurrentTheme = (state: RootState) => state.theme.currentTheme

export const selectActualTheme = (state: RootState) =>
  state.theme.currentTheme === ThemeValue.SYSTEM
    ? state.theme.systemTheme
    : state.theme.currentTheme
