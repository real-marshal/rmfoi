export enum ThemeValue {
  SYSTEM = 'system',
  DARK = 'dark',
  LIGHT = 'light',
}

export const SYSTEM_THEME_FALLBACK = ThemeValue.LIGHT

export type SystemThemeValue = Exclude<ThemeValue, ThemeValue.SYSTEM>

type ThemeKey =
  | 'background'
  | 'primary'
  | 'gradientBlue'
  | 'gradientBlueGreyed'
  | 'gradientGreenBlue'

export type Theme = Readonly<Record<ThemeKey, string>>
