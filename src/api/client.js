const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
    this.interceptors = []
  }

  addInterceptor(interceptor) {
    this.interceptors.push(interceptor)
  }

  async request(endpoint, options = {}) {
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

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) })
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) })
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