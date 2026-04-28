export const updateProfile = async (data) => {
  const token = localStorage.getItem('authToken')
  if (!token) throw new Error('Not authenticated')

  const response = await fetch('/api/auth/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to update profile')
  }

  return response.json()
}
