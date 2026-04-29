import * as mockData from './mockData'

const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const API_BASE_URL = isDev 
  ? (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api') 
  : '/api'

// For production demo, intercept and return mock data to avoid backend dependency
const USE_MOCKS = !isDev

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
    this.interceptors = []
  }

  addInterceptor(interceptor) {
    this.interceptors.push(interceptor)
  }

  async request(endpoint, options = {}) {
    if (USE_MOCKS) {
      return this.mockRequest(endpoint, options)
    }

    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    let request = { url, ...config }
    
    for (const interceptor of this.interceptors) {
      request = await interceptor(request) || request
    }

    try {
      const response = await fetch(request.url, request)
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new ApiError(response.status, error.message || 'Request failed', error)
      }
      
      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError(0, error.message, {})
    }
  }

  async mockRequest(endpoint, options) {
    console.log(`[Mock API] ${options.method || 'GET'} ${endpoint}`)
    
    // Artificial delay
    await new Promise(r => setTimeout(r, 300))

    if (endpoint.startsWith('/auth/me')) return mockData.demoUser
    if (endpoint.startsWith('/auth/verify-token')) {
      return { token: 'mock_jwt_token', user: mockData.demoUser }
    }
    if (endpoint.startsWith('/voters/search')) {
      const params = new URLSearchParams(endpoint.split('?')[1])
      const q = params.get('q')?.toLowerCase() || ''
      const filtered = mockData.voters.filter(v => 
        v.name.toLowerCase().includes(q) || v.voterId.toLowerCase().includes(q)
      )
      return { voters: filtered, pagination: { total: filtered.length, pages: 1 } }
    }
    if (endpoint.startsWith('/voters/dashboard/stats')) {
      return { totalAssigned: 50, verified: 12, pending: 38, verifiedByMe: 8 }
    }
    if (endpoint.startsWith('/voters/')) {
      const id = endpoint.split('/')[2]
      const voter = mockData.voters.find(v => v.voterId === id || v.id === id)
      if (voter) return voter
      throw new ApiError(404, 'Voter not found')
    }
    if (endpoint.startsWith('/booths/search')) {
      return { booths: mockData.booths, pagination: { total: mockData.booths.length, pages: 1 } }
    }
    if (endpoint.startsWith('/notifications')) {
      return { notifications: mockData.notifications, pagination: { total: mockData.notifications.length, pages: 1 } }
    }
    if (endpoint.startsWith('/complaints')) {
      if (options.method === 'POST') return { id: 'complaint_' + Date.now(), status: 'pending' }
      return { complaints: [], pagination: { total: 0, pages: 1 } }
    }

    return {}
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) })
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) })
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(data) })
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(data) })
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' })
  }
}

class ApiError extends Error {
  constructor(status, message, details = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

const apiClient = new ApiClient()

apiClient.addInterceptor(async (request) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return request
})

export { ApiClient, ApiError, apiClient }
export default apiClient