// src/features/users/users.api.js
import { apiRequest } from '../../utils/apiRequest'
import { API_PATHS } from '../../utils/apiPaths'

export const getUsers = () => apiRequest(API_PATHS.AUTH.GET_ALL_USERS, 'GET')

export const getUser = (id) => apiRequest(API_PATHS.AUTH.GET_USER(id), 'GET')

export const createUser = (data) => apiRequest(API_PATHS.AUTH.REGISTER, 'POST', data)

export const updateUser = ({ id, ...data }) =>
  apiRequest(API_PATHS.AUTH.UPDATE_USER(id), 'PATCH', data)

export const deleteUser = (id) => apiRequest(API_PATHS.AUTH.DELETE_USER(id), 'DELETE')

// Auth
export const login = (data) => apiRequest(API_PATHS.AUTH.LOGIN, 'POST', data)
export const logout = () => apiRequest(API_PATHS.AUTH.LOGOUT, 'POST')
