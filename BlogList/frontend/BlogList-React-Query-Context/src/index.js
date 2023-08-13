import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import { NotifyContextProvider } from './contexts/NotificationContext'
import { UserContextProvider } from './contexts/UserContext'
import './dark-theme.css'
import { BrowserRouter as Router, } from 'react-router-dom'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotifyContextProvider>
      <UserContextProvider>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </NotifyContextProvider>
  </QueryClientProvider>
)