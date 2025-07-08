import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

const getMyBookings = async () => {
  const res = await axiosInstance.get('/my-bookings');
  return res.data;
};

export const useMyBookings = () => {
  return useQuery({
    queryKey: ['my-bookings'],
    queryFn: getMyBookings,
  });
};
