import apiClient from './client'

const VOTER_ENDPOINTS = {
  SEARCH: '/voters/search',
  GET: '/voters/:id',
  VALIDATE: '/voters/validate',
  QR_GENERATE: '/voters/:id/qr',
  QR_VERIFY: '/voters/verify-qr',
}

export const voterApi = {
  async searchVoters(query, filters = {}) {
    const params = new URLSearchParams({ q: query, ...filters })
    return apiClient.get(`${VOTER_ENDPOINTS.SEARCH}?${params}`)
  },

  async getVoter(voterId) {
    const endpoint = VOTER_ENDPOINTS.GET.replace(':id', voterId)
    return apiClient.get(endpoint)
  },

  async validateVoter(voterData) {
    return apiClient.post(VOTER_ENDPOINTS.VALIDATE, voterData)
  },

  async generateQR(voterId, options = {}) {
    const endpoint = VOTER_ENDPOINTS.QR_GENERATE.replace(':id', voterId)
    return apiClient.post(endpoint, options)
  },

  async verifyQR(qrData) {
    return apiClient.post(VOTER_ENDPOINTS.QR_VERIFY, { qrData })
  },
}

export default voterApi