import { mockVoters, searchVoters, getVoterById, generateVoterQRData } from '../services/voterService'
import voterApi from '../api/voterApi'

class VoterServiceAdapter {
  constructor() {
    this.useRealApi = false
    this.apiClient = voterApi
  }

  setUseRealApi(enabled) {
    this.useRealApi = enabled
  }

  async search(query, filters = {}) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.searchVoters(query, filters)
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return searchVoters(query)
  }

  async getById(id) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.getVoter(id)
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return getVoterById(id)
  }

  async generateQR(voter) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.generateQR(voter.id)
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return generateVoterQRData(voter)
  }

  async validateVoter(voterData) {
    if (this.useRealApi) {
      try {
        return await this.apiClient.validateVoter(voterData)
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error)
        this.useRealApi = false
      }
    }
    return { valid: true, voter: voterData }
  }
}

const voterServiceAdapter = new VoterServiceAdapter()

export { voterServiceAdapter }
export default voterServiceAdapter