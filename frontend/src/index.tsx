import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import reportWebVitals from './reportWebVitals'
import GlobalStyle, { theme } from './global-style'
import Routes from './routes'
import store from '@store/index'
import { setLoggedUser } from '@store/user'
import Toast from '@components/toast'
import { Token } from '@models/auth'
import { readTokenFromLocalStorage } from '@services/auth'

readTokenFromLocalStorage('full')
  .then((tokenData: Token): void => {
    if (tokenData) {
      delete tokenData.iat
      delete tokenData.exp
      store.dispatch(setLoggedUser(tokenData))
    }
  }).finally(() => ReactDOM.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Toast />
          <Routes />
        </ThemeProvider>
      </Provider>
    </StrictMode>,
    document.getElementById('root')
  ))

reportWebVitals()
