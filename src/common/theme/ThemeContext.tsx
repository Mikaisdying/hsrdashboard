import { createContext, useContext } from 'react'
import { PRIMARY_COLOR_DARK, type Theme } from './theme.constant'

export interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  primaryColor: string
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  setTheme: () => {},
  primaryColor: PRIMARY_COLOR_DARK,
})

export const useTheme = () => useContext(ThemeContext)
