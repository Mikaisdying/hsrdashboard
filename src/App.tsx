import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import routes from './routes/appRoutes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => {
          const Page = (
            <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%' }}>
              <MainLayout>{element}</MainLayout>
            </div>
          )
          return <Route key={path} path={path} element={Page} />
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
