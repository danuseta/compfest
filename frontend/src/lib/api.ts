const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`
}

export { API_BASE_URL } 