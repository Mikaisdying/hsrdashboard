import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { PRIMARY_COLOR_DARK, PRIMARY_COLOR_LIGHT, type Theme } from './theme.constant'
import { getAntdThemeConfig, getProLayoutToken } from './antdThemeConfig'

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  antdThemeConfig: any
  proLayoutToken: any
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  setTheme: () => {},
  antdThemeConfig: {},
  proLayoutToken: {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark')

  const primaryColor = theme === 'dark' ? PRIMARY_COLOR_DARK : PRIMARY_COLOR_LIGHT

  const { antdThemeConfig, proLayoutToken } = useMemo(
    () => ({
      antdThemeConfig: getAntdThemeConfig(theme, primaryColor),
      proLayoutToken: getProLayoutToken(theme, primaryColor),
    }),
    [theme, primaryColor]
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, antdThemeConfig, proLayoutToken }}>
      {children}
    </ThemeContext.Provider>
  )
}
