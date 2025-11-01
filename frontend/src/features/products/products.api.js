// src/features/users/users.api.js
import { apiRequest } from '../../utils/apiRequest'
import { API_PATHS } from '../../utils/apiPaths'

export const getProducts = () => apiRequest(API_PATHS.PRODUCT.ALL, 'GET')
export const getCartProducts = (query) => {
  console.log(`/api/products?${query}`)

  apiRequest(API_PATHS.PRODUCT.GET_CART_PRODUCTS(query), 'GET')
}

// export const createUser = (data) => apiRequest(API_PATHS.AUTH.REGISTER, 'POST', data)
// export const updateUser = (data) => apiRequest(API_PATHS.AUTH.UPDATE_USER, 'PATCH', data)
// export const deleteUser = (id) => apiRequest(API_PATHS.AUTH.DELETE_USER(id), 'DELETE')

// Auth
// export const login = (data) => apiRequest(API_PATHS.AUTH.LOGIN, 'POST', data)
// export const logout = () => apiRequest(API_PATHS.AUTH.LOGOUT, 'POST')
