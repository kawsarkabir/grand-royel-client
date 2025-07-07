import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

const getRooms = async () => {
  const res = await axiosInstance.get('/rooms');
  return res.data;
};

export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
};
