import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './common/theme/ThemeContext'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
)
