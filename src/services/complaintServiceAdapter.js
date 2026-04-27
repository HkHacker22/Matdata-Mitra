import { submitComplaint, getComplaintStatus, getUserComplaints, complaintCategories } from '../services/complaintService'
import complaintApi from '../api/complaintApi'

class ComplaintServiceAdapter {
  constructor() {
    this.useRealApi = false
    this.apiClient = complaintApi
  }

  setUseRealApi(enabled) {
    this.useRealApi = enabled
  }

  async submit(complaintData) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.createComplaint(complaintData)
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return submitComplaint(complaintData)
  }

  async getStatus(complaintId) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.getComplaint(complaintId)
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return getComplaintStatus(complaintId)
  }

  async getUserComplaints(voterId) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.listComplaints({ voterId })
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return getUserComplaints(voterId)
  }

  async getCategories() {
    if (this.useRealApi) {
      try {
        return await this.apiClient.getCategories()
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return complaintCategories
  }
}

const complaintServiceAdapter = new ComplaintServiceAdapter()

export { complaintServiceAdapter }
export default complaintServiceAdapter