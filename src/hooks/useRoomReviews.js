// hooks/useRoomReviews.ts
import axiosInstance from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export function useRoomReviews(roomId) {
  return useQuery({
    queryKey: ['reviews', roomId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/rooms/${roomId}/reviews`);
      return data || []; // your backend sends raw array, not { reviews: [...] }
    },
    enabled: !!roomId, // prevent unnecessary fetches
  });
}
