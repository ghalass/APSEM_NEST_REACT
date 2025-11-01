// src/index.js

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'

import './i18n'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './context/AuthContext'
const queryClient = new QueryClient()

import { HelmetProvider } from 'react-helmet-async'

import './utils/yupLocale' // 👈 active la traduction Yup ici

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </AuthContextProvider>
  </HelmetProvider>,
)
