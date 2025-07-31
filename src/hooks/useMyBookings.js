import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';

const getMyBookings = async () => {
  const res = await axiosInstance.get('/bookings/my-bookings');
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
      // Add success toast
      toast.success('Booking cancelled successfully!');
    },
    onError: () => {
      toast.error('Failed to cancel booking.');
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
      toast.success('Booking date updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update booking date.');
    },
  });
};
