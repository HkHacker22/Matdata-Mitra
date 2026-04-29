import { apiClient } from '../api/client'

export const updateProfile = async (data) => {
  return await apiClient.patch('/auth/profile', data)
}
