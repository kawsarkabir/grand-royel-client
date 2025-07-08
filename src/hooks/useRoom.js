import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

const getRoom = async (roomId) => {
  const res = await axiosInstance.get(`/rooms/${roomId}`);
  return res.data;
};

export const useRoom = (roomId) => {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoom(roomId),
    enabled: !!roomId,
  });
};
