import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './common/theme/ThemeContext'
import { Provider } from 'react-redux'
import store from './store'
import 'antd/dist/reset.css'
import { App as AntdApp } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <AntdApp>
        <App />
      </AntdApp>
    </ThemeProvider>
  </Provider>
)
