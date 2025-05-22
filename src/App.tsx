import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import routes from './routes/appRoutes'
import './App.css'

import { useTheme } from './common/theme/ThemeContext'
import { ConfigProvider } from 'antd'
import React from 'react'

export const ProLayoutTokenContext = React.createContext<any>({})

const App: React.FC = () => {
  const { theme, antdThemeConfig, proLayoutToken } = useTheme()

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <ProLayoutTokenContext.Provider value={proLayoutToken}>
        <div className={theme === 'dark' ? 'theme-dark' : 'theme-light'}>
          <BrowserRouter>
            <Routes>
              {routes
                .filter((route) => route.layout === 'none')
                .map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              <Route path="/" element={<MainLayout />}>
                {routes
                  .filter((route) => route.layout === 'main')
                  .map(({ path, element }) => (
                    <Route
                      key={path}
                      path={path === '/' ? '' : path.replace(/^\//, '')}
                      element={element}
                    />
                  ))}
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ProLayoutTokenContext.Provider>
    </ConfigProvider>
  )
}

export default App
