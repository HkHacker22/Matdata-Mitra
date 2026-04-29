import { apiClient } from '../api/client'

export const complaintCategories = [
  { id: 'evm_malfunction', label: 'EVM Malfunction', icon: '⚙️' },
  { id: 'booth_issue', label: 'Booth Problems', icon: '🏢' },
  { id: 'accessibility', label: 'Accessibility Issues', icon: '♿' },
  { id: 'voter_intimidation', label: 'Voter Intimidation', icon: '👤' },
  { id: 'other', label: 'Other', icon: '❓' },
]

export const submitComplaint = async (complaintData) => {
  return await apiClient.post('/complaints', complaintData)
}

export const getComplaints = async (status = '') => {
  const query = status ? `?status=${status}` : ''
  return await apiClient.get(`/complaints${query}`)
}

export const updateComplaintStatus = async (id, status, resolution = '') => {
  return await apiClient.patch(`/complaints/${id}`, { status, resolution })
}