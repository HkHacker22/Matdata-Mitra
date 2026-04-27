import apiClient from './client'

const BOOTH_ENDPOINTS = {
  SEARCH: '/booths/search',
  GET: '/booths/:id',
  NEAREST: '/booths/nearest',
  DIRECTIONS: '/booths/:id/directions',
}

export const boothApi = {
  async searchBooths(query, filters = {}) {
    const params = new URLSearchParams({ q: query, ...filters })
    return apiClient.get(`${BOOTH_ENDPOINTS.SEARCH}?${params}`)
  },

  async getBooth(boothId) {
    const endpoint = BOOTH_ENDPOINTS.GET.replace(':id', boothId)
    return apiClient.get(endpoint)
  },

  async getNearestBooths(lat, lng, limit = 5) {
    const params = new URLSearchParams({ lat, lng, limit })
    return apiClient.get(`${BOOTH_ENDPOINTS.NEAREST}?${params}`)
  },

  async getDirections(boothId, fromLat, fromLng) {
    const endpoint = BOOTH_ENDPOINTS.DIRECTIONS.replace(':id', boothId)
    return apiClient.post(endpoint, { fromLat, fromLng })
  },
}

export default boothApi