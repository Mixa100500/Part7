import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import { NotifyContextProvider } from './contexts/NotificationContext'
import { UserContextProvider } from './contexts/UserContext'
import './index.css'
import './dark-theme.css'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotifyContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotifyContextProvider>
  </QueryClientProvider>
)