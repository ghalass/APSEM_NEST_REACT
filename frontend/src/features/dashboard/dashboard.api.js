// src/features/users/users.api.js
import { apiRequest } from '../../utils/apiRequest'
import { API_PATHS } from '../../utils/apiPaths'

export const getDashboardData = () => apiRequest(API_PATHS.DASHBOARD.DASHBOARD, 'GET')
