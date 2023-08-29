import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './reducers/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
)