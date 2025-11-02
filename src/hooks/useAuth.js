import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Login,
  Register,
  ResetPassowrd,
  ForgotPassword,
  UserDetails,
  UserPassowordUpdate,
  UserDetailsUpdate,
  Logout
} from '../apis/auth-apis';
import { toast } from 'react-toastify';


// ✅ Login User
export const useLoginUser = () => {
  return useMutation({
    mutationFn: Login,
    onSuccess: (data) =>{
      localStorage.setItem('token',data.token)
      toast.success('✅ Login successful')},
    onError: (error) => toast.error(error?.response?.data?.message || error.message || '❌ Login failed'),
  });
};


// ✅ Register User
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: Register,
    onSuccess: () => {
      localStorage.setItem('token',data.token)      
      toast.success('✅ Registration successful')},
    onError: (error) => toast.error(error?.response?.data?.message || error.message || '❌ Registration failed'),
  });
};


// ✅ Forgot Password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: ForgotPassword,
    onSuccess: () => toast.success('📩 Password reset email sent'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || '❌ Failed to send reset email'),
  });
};


// ✅ Reset Password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, data }) => ResetPassowrd(token, data),
    onSuccess: () => toast.success('🔐 Password reset successful'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || '❌ Password reset failed'),
  });
};


// ✅ Get Logged-in User Details
export const useUserDetails = () => {
  return useQuery({
    queryKey: ['userDetails'],
    queryFn: UserDetails,
    onError: (error) => toast.error(error?.response?.data?.message || error.message || '❌ Failed to fetch user details'),
  });
};


// ✅ Update User Password
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: UserPassowordUpdate,
    onSuccess: () => toast.success('🔑 Password updated successfully'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || '❌ Password update failed'),
  });
};


// ✅ Update User Profile
export const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: UserDetailsUpdate,
    onSuccess: () => toast.success('👤 Profile updated successfully'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || '❌ Profile update failed'),
  });
};


// ✅ Logout
export const useLogoutUser = () => {
  return useMutation({
    mutationFn: Logout,
    onSuccess: () => toast.success('👋 Logged out successfully'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || '❌ Logout failed'),
  });
};
