import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

const getRooms = async (minPrice, maxPrice) => {
  const queryParams = new URLSearchParams();
  if (minPrice !== null) queryParams.append('minPrice', minPrice);
  if (maxPrice !== null) queryParams.append('maxPrice', maxPrice);

  const res = await axiosInstance.get(`/rooms?${queryParams.toString()}`);
  console.log('🟡 Raw room data:', res.data); // ✅ Add this
  return res.data;
};

export const useRooms = ({ minPrice, maxPrice }) => {
  return useQuery({
    queryKey: ['rooms', minPrice, maxPrice],
    queryFn: () => getRooms(minPrice, maxPrice),
  });
};
