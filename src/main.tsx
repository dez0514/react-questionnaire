import ReactDOM from 'react-dom/client'
import store from '@/reducers/index'
import App from './App.tsx'
import 'normalize.css'
import '@/styles/reset.scss'
import '@/styles/global.scss'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
)
