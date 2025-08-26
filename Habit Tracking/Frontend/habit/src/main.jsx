import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import Store from './store/index.js'

const queryclient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <QueryClientProvider client={queryclient}>
    <App />
    </QueryClientProvider>
    </Provider>
  </StrictMode>
)
