import apiClient from './client'

const COMPLAINT_ENDPOINTS = {
  CREATE: '/complaints',
  GET: '/complaints/:id',
  LIST: '/complaints',
  UPDATE_STATUS: '/complaints/:id/status',
  CATEGORIES: '/complaints/categories',
}

export const complaintApi = {
  async createComplaint(complaintData) {
    return apiClient.post(COMPLAINT_ENDPOINTS.CREATE, complaintData)
  },

  async getComplaint(complaintId) {
    const endpoint = COMPLAINT_ENDPOINTS.GET.replace(':id', complaintId)
    return apiClient.get(endpoint)
  },

  async listComplaints(filters = {}) {
    const params = new URLSearchParams(filters)
    return apiClient.get(`${COMPLAINT_ENDPOINTS.LIST}?${params}`)
  },

  async updateComplaintStatus(complaintId, status) {
    const endpoint = COMPLAINT_ENDPOINTS.UPDATE_STATUS.replace(':id', complaintId)
    return apiClient.put(endpoint, { status })
  },

  async getCategories() {
    return apiClient.get(COMPLAINT_ENDPOINTS.CATEGORIES)
  },
}

export default complaintApi