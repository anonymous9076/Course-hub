import apiClient from "./api-client"

export const GetSavedData = async () => {
  const res = await apiClient.get('/get-saved-item')
  return res.data;
}
export const ToggleSaved = async (id, data) => {
  const res = await apiClient.post(`/toggle-save-item/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
}