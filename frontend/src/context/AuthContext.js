// AuthContext.jsx
import { createContext, useContext, useEffect, useReducer } from 'react'
import { api } from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

export const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, loading: false }
    case 'LOADING':
      return { ...state, loading: true }
    case 'FINISH_LOADING':
      return { ...state, loading: false }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // ✅ Intercepteur global ici
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          console.warn('⚠️ Session expirée - Déconnexion automatique')
          dispatch({ type: 'LOGOUT' })
          window.location.hash = '#/login' // ou navigate('/login') si BrowserRouter
        }
        return Promise.reject(error)
      },
    )

    // 🔁 Nettoyer l’intercepteur quand le provider est démonté
    return () => {
      api.interceptors.response.eject(interceptor)
    }
  }, [dispatch])

  // Exemple de check auth au chargement
  const checkAuthStatus = async () => {
    dispatch({ type: 'LOADING' })
    try {
      const res = await api.get(API_PATHS.AUTH.GET_CURRENT_USER)
      dispatch({ type: 'LOGIN', payload: res.data })
    } catch {
      dispatch({ type: 'LOGOUT' })
    } finally {
      dispatch({ type: 'FINISH_LOADING' })
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
