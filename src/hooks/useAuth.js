import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  UserDetails,
  UserPasswordUpdate,
  UserDetailsUpdate,
  Logout
} from '../apis/auth-apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      toast.success('Login successful')
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    },
    onError: (error) => toast.error(error?.response?.data?.message || error.message || ' Login failed'),
  });
};


export const useRegisterUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: Register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      toast.success('Registration successful')
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    onError: (error) => toast.error(error?.response?.data?.message || error.message || 'Registration failed'),
  });
};


export const useForgotPassword = () => {
  return useMutation({
    mutationFn: ForgotPassword,
    onSuccess: () => toast.success('Password reset email sent'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || 'Failed to send reset email'),
  });
};


export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, data }) => ResetPassword(token, data),
    onSuccess: () => toast.success(' Password reset successful'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || ' Password reset failed'),
  });
};


export const useUserDetails = () => {
  return useQuery({
    queryKey: ['userDetails'],
    queryFn: UserDetails,
    onError: (error) => toast.error(error?.response?.data?.message || error.message || ' Failed to fetch user details'),
  });
};


export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: UserPasswordUpdate,
    onSuccess: () => toast.success(' Password updated successfully'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || ' Password update failed'),
  });
};


export const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: UserDetailsUpdate,
    onSuccess: () => toast.success(' Profile updated successfully'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || ' Profile update failed'),
  });
};


export const useLogoutUser = () => {
  return useMutation({
    mutationFn: Logout,
    onSuccess: () => toast.success(' Logged out successfully'),
    onError: (error) => toast.error(error?.response?.data?.message || error.message || ' Logout failed'),
  });
};
