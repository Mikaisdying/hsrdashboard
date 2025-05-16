import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import routes from './routes/appRoutes'
import './App.css'
import { useTheme } from './theme/ThemeContext'
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
      <div
        className={theme === 'dark' ? 'theme-dark' : 'theme-light'}
        style={{
          minHeight: '100vh',
          width: '100%',
          background: theme === 'dark' ? '#181414' : '#fff',
        }}
      >
        <BrowserRouter>
          <Routes>
            {routes.map(({ path, element }) => {
              const Page = (
                <div style={{ width: '100%' }}>
                  <MainLayout>{element}</MainLayout>
                </div>
              )
              return <Route key={path} path={path} element={Page} />
            })}
          </Routes>
          lur
        </BrowserRouter>
      </div>
    </ConfigProvider>
  )
}

export default App
