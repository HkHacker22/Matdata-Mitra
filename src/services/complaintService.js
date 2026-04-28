export const complaintCategories = [
  { id: 'evm_malfunction', label: 'EVM Malfunction', icon: '⚙️' },
  { id: 'booth_issue', label: 'Booth Problems', icon: '🏢' },
  { id: 'accessibility', label: 'Accessibility Issues', icon: '♿' },
  { id: 'voter_intimidation', label: 'Voter Intimidation', icon: '👤' },
  { id: 'other', label: 'Other', icon: '❓' },
]

// Helper for authenticated requests
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('authToken')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(url, { ...options, headers })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'API request failed')
  }
  return response.json()
}

export const submitComplaint = async (complaintData) => {
  return await authFetch('/api/complaints', {
    method: 'POST',
    body: JSON.stringify(complaintData),
  })
}

export const getComplaints = async (status = '') => {
  const query = status ? `?status=${status}` : ''
  return await authFetch(`/api/complaints${query}`)
}

export const updateComplaintStatus = async (id, status, resolution = '') => {
  return await authFetch(`/api/complaints/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, resolution }),
  })
}