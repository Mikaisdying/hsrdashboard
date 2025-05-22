import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import routes from './routes/appRoutes'
import './App.css'

import { useTheme } from './common/theme/ThemeContext'
import { ConfigProvider, theme as antdTheme } from 'antd'

const App: React.FC = () => {
  const { theme, primaryColor } = useTheme()

  const antdTokens = {
    colorPrimary: primaryColor,
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: antdTokens,
      }}
    >
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
    </ConfigProvider>
  )
}

export default App
