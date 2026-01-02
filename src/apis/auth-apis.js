import apiClient from "./api-client"

export const Login = async (data) => {
  const res = await apiClient.post('/login', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
}
export const Register = async (data) => {
  console.log(data, 'data')
  const res = await apiClient.post('/register', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
}
export const ResetPassword = async (token, data) => {
  const res = await apiClient.put(`/password/reset/${token}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
}
export const ForgotPassword = async (data) => {
  const res = await apiClient.post('/password/forgot', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
}
export const UserDetails = async () => {
  const res = await apiClient.get('/me')
  return res.data;
}
export const UserPasswordUpdate = async (data) => {
  const res = await apiClient.put('/password/update', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
}
export const UserDetailsUpdate = async (data) => {
  const res = await apiClient.put('/me/update', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
}
export const Logout = async () => {
  const res = await apiClient.get('/logout')
  return res.data;
}

