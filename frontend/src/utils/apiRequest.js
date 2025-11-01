// src/utils/apiRequest.js
import { api } from './axiosInstance'

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const config = {
    method,
    url: endpoint,
    data: body ? JSON.stringify(body) : undefined,
  }

  const response = await api(config)
  return response.data
}
