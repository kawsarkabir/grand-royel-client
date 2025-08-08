import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

const addRoom = async (roomData) => {
  const res = await axiosInstance.post('/rooms', roomData);
  return res.data;
};

export const useAddRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};
