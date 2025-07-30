import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

const getMyBookings = async () => {
  const res = await axiosInstance.get('/my-bookings');
  console.log("my bookings data:", res.data);
  return res.data;
};

export const useMyBookings = () => {
  return useQuery({
    queryKey: ['my-bookings'],
    queryFn: getMyBookings,
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId) => axiosInstance.delete(`/bookings/${bookingId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-bookings']);
    },
  });
};

export const useUpdateBookingDate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, newDate }) =>
      axiosInstance.patch(`/bookings/${bookingId}`, { newDate }),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-bookings']);
    },
  });
};
