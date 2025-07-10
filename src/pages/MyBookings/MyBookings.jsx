import React, { useState } from 'react';
import moment from 'moment';
import {
  useCancelBooking,
  useMyBookings,
  useUpdateBookingDate,
} from '@/hooks/useMyBookings';
import { UpdateDateModal } from './UpdateDateModal';
import { ReviewModal } from './ReviewModal';
import { CancelBookingModal } from './CencelBookingModal';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Title } from 'react-head';

export default function MyBookingsPage() {
  const { data: bookings = [], isLoading } = useMyBookings();
  const cancelBookingMutation = useCancelBooking();
  const updateBookingMutation = useUpdateBookingDate();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const handleOpenUpdateModal = (booking) => {
    setSelectedBooking(booking);
    setUpdateModalOpen(true);
  };

  const handleConfirmUpdate = (bookingId, newDate) => {
    updateBookingMutation.mutate(
      { bookingId, newDate: moment(newDate).format('YYYY-MM-DD') },
      {
        onSuccess: () => {
          alert('Booking date updated!');
          setUpdateModalOpen(false);
        },
        onError: () => alert('Failed to update booking date.'),
      },
    );
  };

  const openReviewModal = (booking) => {
    setSelectedBooking(booking);
    setReviewModalOpen(true);
  };

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = (bookingId) => {
    cancelBookingMutation.mutate(bookingId, {
      onSuccess: () => {
        setCancelModalOpen(false);
      },
      onError: () => toast.error('Failed to cancel booking.'),
    });
  };

  if (isLoading) return <LoadingSpinner />;

  if (bookings.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Bookings Yet</h2>
        <p className="text-muted-foreground">
          You haven’t booked any rooms yet.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      <Title> Grand Royel | My Bookings </Title>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Room</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Booked Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-200">
                <td className="p-3">
                  <img
                    src={booking.roomImage || '/placeholder.jpg'}
                    alt={booking.roomName}
                    className="w-20 h-14 object-cover rounded-md"
                  />
                </td>
                <td className="p-3 font-medium">
                  <Link
                    to={`/rooms/${booking.roomId}`}
                    className="hover:underline"
                  >
                    {booking.roomName}
                  </Link>
                </td>
                <td className="p-3">${booking.price}</td>
                <td className="p-3">
                  {moment(booking.bookedDate).format('MMM DD, YYYY')}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-500'
                        : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <Button
                    size={'sm'}
                    className={
                      'bg-sky-100 text-sky-500 rounded-full text-xs font-semibold'
                    }
                    onClick={() => handleOpenUpdateModal(booking)}
                  >
                    Update
                  </Button>
                  <Button
                    className={
                      'bg-yellow-100 text-yellow-500 rounded-full text-xs font-semibold'
                    }
                    size={'sm'}
                    onClick={() => openReviewModal(booking)}
                  >
                    Review
                  </Button>
                  <Button
                    className={
                      'bg-red-100 text-red-500 rounded-full text-xs font-semibold'
                    }
                    size={'sm'}
                    onClick={() => openCancelModal(booking)}
                    disabled={cancelBookingMutation.isLoading}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedBooking && (
        <>
          <UpdateDateModal
            isOpen={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            booking={selectedBooking}
            onConfirm={handleConfirmUpdate}
          />
          <ReviewModal
            isOpen={reviewModalOpen}
            onClose={() => setReviewModalOpen(false)}
            booking={selectedBooking}
          />
          <CancelBookingModal
            isOpen={cancelModalOpen}
            onClose={() => setCancelModalOpen(false)}
            booking={selectedBooking}
            onConfirm={handleConfirmCancel}
          />
        </>
      )}
    </div>
  );
}
