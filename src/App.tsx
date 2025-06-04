import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import routes from './routes/appRoutes'
import './App.css'
import { useTheme } from './common/theme/ThemeContext'
import { ConfigProvider } from 'antd'
import React, { useEffect } from 'react'

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
  const { antdThemeConfig, proLayoutToken } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (
      !user &&
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/register'
    ) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <ProLayoutTokenContext.Provider value={proLayoutToken}>
        <div className={'theme-dark'}>
          <Routes>
            {routes
              .filter((r) => r.layout === 'none')
              .map(({ path, element }, i) => (
                <Route key={path || i} path={path} element={element} />
              ))}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <MainLayout />
                </RequireAuth>
              }
            >
              {renderRoutes(routes.filter((r) => r.layout === 'main'))}
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </ProLayoutTokenContext.Provider>
    </ConfigProvider>
  )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem('user')
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default App
