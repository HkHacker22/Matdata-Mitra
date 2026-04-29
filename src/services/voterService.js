import { apiClient } from '../api/client'

export const searchVoters = async (query) => {
  try {
    const data = await apiClient.get(`/voters/search?q=${encodeURIComponent(query)}`)
    return data.voters || []
  } catch (err) {
    console.error('searchVoters error:', err)
    throw err
  }
}

export const getVoterById = async (id) => {
  try {
    return await apiClient.get(`/voters/${encodeURIComponent(id)}`)
  } catch (err) {
    console.error('getVoterById error:', err)
    return null
  }
}

export const generateVoterQRData = (voter) => {
  return JSON.stringify({
    id: voter._id,
    voterId: voter.voterId,
    name: voter.name,
    partNo: voter.partNo,
    sectionNo: voter.sectionNo,
    timestamp: new Date().toISOString(),
  })
}

export const verifyVoter = async (id) => {
  try {
    return await apiClient.post(`/voters/${id}/verify`)
  } catch (err) {
    console.error('verifyVoter error:', err)
    throw err
  }
}

export const getRecentVerifications = async () => {
  try {
    return await apiClient.get('/voters/verifications/recent?limit=5')
  } catch (err) {
    console.error('getRecentVerifications error:', err)
    return []
  }
}

export const getVoterStats = async () => {
  try {
    return await apiClient.get('/voters/dashboard/stats')
  } catch (err) {
    console.error('getVoterStats error:', err)
    return { totalAssigned: 0, verified: 0, pending: 0, verifiedByMe: 0 }
  }
}