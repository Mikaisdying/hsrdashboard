import React, { createContext, useContext, useState } from 'react'

export type Theme = 'dark' | 'light'
interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  primaryColor: string
}

const PRIMARY_COLOR_LIGHT = '#13c2c2'
const PRIMARY_COLOR_DARK = '#08979c'

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  setTheme: () => {},
  primaryColor: PRIMARY_COLOR_DARK,
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark')
  const primaryColor = theme === 'dark' ? PRIMARY_COLOR_DARK : PRIMARY_COLOR_LIGHT

  return (
    <ThemeContext.Provider value={{ theme, setTheme, primaryColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
