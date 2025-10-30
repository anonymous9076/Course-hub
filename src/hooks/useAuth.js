import { useMutation } from '@tanstack/react-query';
import { LoginApi } from '../apis/auth-apis';
import { toast } from 'react-toastify';

export const useLoginUser = () => {
  return useMutation({
    mutationFn: LoginApi,
    onSuccess: () => {
      toast.success('✅ Login successful');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || '❌ Login failed');
    },
  });
};
