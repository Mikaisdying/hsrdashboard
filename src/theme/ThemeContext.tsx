import React, { createContext, useContext, useState } from 'react'
import { themeColors as themeColorTokens } from './colors'

export type Theme = 'dark' | 'light'
interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  themeColors: (typeof themeColorTokens)['dark']
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  setTheme: () => {},
  themeColors: themeColorTokens.dark,
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark')
  const themeColors = themeColorTokens[theme]
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
