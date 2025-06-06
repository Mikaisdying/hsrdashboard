import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import routes from './routes/appRoutes'
import './App.css'
import { useTheme } from './common/theme/ThemeContext'
import { ConfigProvider } from 'antd'
import React from 'react'
import viVN from 'antd/lib/locale/vi_VN'

export const ProLayoutTokenContext = React.createContext<any>({})

const renderRoutes = (routes: any[]) =>
  routes.map(({ path, element, children }, idx) =>
    children?.length ? (
      <Route key={path || idx} path={path === '/' ? '' : path} element={element}>
        {renderRoutes(children)}
      </Route>
    ) : (
      <Route key={path || idx} path={path === '/' ? '' : path} element={element} />
    )
  )

const App: React.FC = () => {
  const { theme, antdThemeConfig, proLayoutToken } = useTheme()

  return (
    <ConfigProvider locale={viVN} theme={antdThemeConfig}>
      <ProLayoutTokenContext.Provider value={proLayoutToken}>
        <div className={theme === 'dark' ? 'theme-dark' : 'theme-light'}>
          <BrowserRouter>
            <Routes>
              {routes
                .filter((r) => r.layout === 'none')
                .map(({ path, element }, i) => (
                  <Route key={path || i} path={path} element={element} />
                ))}
              <Route path="/" element={<MainLayout />}>
                {renderRoutes(routes.filter((r) => r.layout === 'main'))}
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ProLayoutTokenContext.Provider>
    </ConfigProvider>
  )
}

export default App
