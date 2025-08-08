import axiosInstance from '@/lib/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getRooms = async (minPrice, maxPrice) => {
  const queryParams = new URLSearchParams();
  if (minPrice !== null) queryParams.append('minPrice', minPrice);
  if (maxPrice !== null) queryParams.append('maxPrice', maxPrice);

  const res = await axiosInstance.get(`/rooms?${queryParams.toString()}`);
  return res.data;
};

export const useRooms = ({ minPrice, maxPrice }) => {
  return useQuery({
    queryKey: ['rooms', minPrice, maxPrice],
    queryFn: () => getRooms(minPrice, maxPrice),
  });
};

// UPDATE: update room
// export const useUpdateRoom = () => {
//   return useMutation({
//     mutationFn: async ({ roomId, roomData }) => {
//       const res = await axiosInstance.patch(`/rooms/${roomId}`, roomData);
//       return res.data;
//     },
//   });
// };

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.patch(`/rooms/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
    },
  });
};

// DELETE: delete room
export const useDeleteRoom = () => {
  return useMutation({
    mutationFn: async (roomId) => {
      try {
        await axiosInstance.delete(`/rooms/${roomId}`);
      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to delete room',
        );
      }
    },
    onError: (error) => {
      return 'Error deleting room:', error.message;
    },
  });
};
