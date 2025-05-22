import { theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd/es/config-provider/context'

const getBaseTheme = (themeMode: 'light' | 'dark', primaryColor: string) => {
  return {
    primary: primaryColor,
    isDarkMode: themeMode === 'dark',
  }
}

export const getAntdThemeConfig = (
  themeMode: 'light' | 'dark',
  primaryColor: string
): ThemeConfig => {
  const { primary, isDarkMode } = getBaseTheme(themeMode, primaryColor)
  return {
    algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: primary,
    },
    components: {
      Menu: {
        itemSelectedBg: primary,
        itemHoverColor: primary,
      },
    },
  }
}

export const getProLayoutToken = (themeMode: 'light' | 'dark', primaryColor: string) => {
  const { primary, isDarkMode } = getBaseTheme(themeMode, primaryColor)
  return {
    colorPrimary: primary,
    sider: {
      colorMenuBackground: isDarkMode ? '#1f1f1f' : '#fff',
      colorTextMenuSelected: '#fff',
      colorBgMenuItemSelected: primary,
    },
  }
}
