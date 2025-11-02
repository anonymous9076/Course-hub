import apiClient from "./api-client"

export const Login = async(data)=>{
    const res = await apiClient.post('/login',data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    return res;
}
export const Register = async(data)=>{
    const res = await apiClient.post('/register',data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    return res;
}
export const ResetPassowrd = async(token,data)=>{
    const res = await apiClient.put(`/password/reset/${token}`,data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    return res;
}
export const ForgotPassword = async(data)=>{
    const res = await apiClient.post('/password/forgot',data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    return res;
}
export const UserDetails = async()=>{
    const res = await apiClient.get('/me')
    return res;
}
export const UserPassowordUpdate = async(data)=>{
    const res = await apiClient.put('/password/update',data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    return res;
}
export const UserDetailsUpdate = async(data)=>{
    const res = await apiClient.put('/me/update',data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    return res;
}
export const Logout = async()=>{
    const res = await apiClient.get('/logout')
    return res;
}

