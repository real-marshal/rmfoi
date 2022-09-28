export enum ThemeValue {
  SYSTEM = 'system',
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeKey = 'background' | 'primary'

export type Theme = Record<ThemeKey, string>
