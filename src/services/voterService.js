export const searchVoters = async (query) => {
  try {
    const response = await fetch(`/api/voters/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) throw new Error('Search failed')
    const data = await response.json()
    return data.voters || []
  } catch (err) {
    console.error('searchVoters error:', err)
    throw err
  }
}

export const getVoterById = async (id) => {
  try {
    const response = await fetch(`/api/voters/${encodeURIComponent(id)}`)
    if (!response.ok) throw new Error('Failed to fetch voter')
    return await response.json()
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
    const token = localStorage.getItem('authToken')
    const response = await fetch(`/api/voters/${id}/verify`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!response.ok) {
      const err = await response.json().catch(()=>({}))
      throw new Error(err.error || 'Failed to verify voter')
    }
    return await response.json()
  } catch (err) {
    console.error('verifyVoter error:', err)
    throw err
  }
}

export const getRecentVerifications = async () => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await fetch('/api/voters/verifications/recent?limit=5', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Failed to fetch recent verifications')
    return await response.json()
  } catch (err) {
    console.error('getRecentVerifications error:', err)
    return []
  }
}

export const getVoterStats = async () => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await fetch('/api/voters/dashboard/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Failed to fetch stats')
    return await response.json()
  } catch (err) {
    console.error('getVoterStats error:', err)
    return { totalAssigned: 0, verified: 0, pending: 0, verifiedByMe: 0 }
  }
}