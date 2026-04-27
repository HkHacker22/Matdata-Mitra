export const complaintCategories = [
  { id: 'voting', label: 'Voting Issues', icon: '🗳️' },
  { id: 'booth', label: 'Booth Problems', icon: '🏢' },
  { id: 'documents', label: 'Document Issues', icon: '📄' },
  { id: ' staff', label: 'Staff Behavior', icon: '👤' },
  { id: 'technical', label: 'Technical Issues', icon: '⚙️' },
  { id: 'other', label: 'Other', icon: '❓' },
]

export const mockComplaints = [
  {
    id: 'C001',
    category: 'booth',
    title: 'Water facility not available',
    description: 'The polling booth does not have drinking water facility.',
    location: 'Sector-15, Rohini',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    voterId: 'V001',
  },
  {
    id: 'C002',
    category: 'staff',
    title: 'Rude behavior by polling officer',
    description: 'The polling officer was rude and did not help elderly voters.',
    location: 'Sector-16, Rohini',
    status: 'resolved',
    createdAt: '2024-01-14T14:20:00Z',
    voterId: 'V003',
  },
]

export const submitComplaint = async (complaintData) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  
  const newComplaint = {
    id: `C${String(mockComplaints.length + 1).padStart(3, '0')}`,
    ...complaintData,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  
  mockComplaints.push(newComplaint)
  return newComplaint
}

export const getComplaintStatus = async (complaintId) => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockComplaints.find((c) => c.id === complaintId) || null
}

export const getUserComplaints = async (voterId) => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockComplaints.filter((c) => c.voterId === voterId)
}