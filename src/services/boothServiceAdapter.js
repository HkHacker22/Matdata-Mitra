import { mockBooths, searchBooths, getNearestBooths, getBoothById } from '../services/boothService'
import boothApi from '../api/boothApi'

class BoothServiceAdapter {
  constructor() {
    this.useRealApi = false
    this.apiClient = boothApi
  }

  setUseRealApi(enabled) {
    this.useRealApi = enabled
  }

  async search(query) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.searchBooths(query)
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return searchBooths(query)
  }

  async getById(id) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.getBooth(id)
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return getBoothById(id)
  }

  async getNearest(lat, lng, limit = 5) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.getNearestBooths(lat, lng, limit)
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return getNearestBooths(lat, lng, limit)
  }
}

const boothServiceAdapter = new BoothServiceAdapter()

export { boothServiceAdapter }
export default boothServiceAdapter