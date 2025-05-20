import React, { useState, useEffect } from 'react'
import { ThemeContext } from './ThemeContext'
import { PRIMARY_COLOR_DARK, PRIMARY_COLOR_LIGHT, type Theme } from './theme.constant'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark')

  const primaryColor = theme === 'dark' ? PRIMARY_COLOR_DARK : PRIMARY_COLOR_LIGHT

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove(theme === 'dark' ? 'light' : 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, primaryColor }}>
      {children}
    </ThemeContext.Provider>
  )
}
