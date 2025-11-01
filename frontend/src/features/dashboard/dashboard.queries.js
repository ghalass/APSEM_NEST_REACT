// src/features/users/users.queries.js
import { useQuery } from '@tanstack/react-query'
import * as dashboardApi from './dashboard.api'

const USERS_KEY = ['dashboardData']

// --- Queries ---
export const useDashboardQuery = () =>
  useQuery({
    queryKey: USERS_KEY,
    queryFn: dashboardApi.getDashboardData,
  })
