import type { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeValue } from './types'

const initialState = ThemeValue.SYSTEM as ThemeValue

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (_, action: PayloadAction<ThemeValue>) => action.payload,
  },
})

export const { reducer: themeReducer, actions } = themeSlice

export const selectTheme = (state: RootState) => state.theme
