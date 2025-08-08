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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaEllipsisV } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
          toast.success('Booking date updated successfully');
          setUpdateModalOpen(false);
        },
        onError: () => toast.error('Failed to update booking date'),
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
        toast.success('Booking cancelled successfully');
        setCancelModalOpen(false);
      },
      onError: () => toast.error('Failed to cancel booking'),
    });
  };

  if (isLoading) return <LoadingSpinner />;

  if (bookings.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Bookings Yet</h2>
        <p className="text-muted-foreground">
          You haven&rsquo;t booked any rooms yet.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Booked Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <img
                  src={booking.roomImage || '/placeholder.jpg'}
                  alt={booking.roomName}
                  className="w-20 h-14 object-cover rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium">
                <Link
                  to={`/rooms/${booking.roomId}`}
                  className="hover:underline"
                >
                  {booking.roomName}
                </Link>
              </TableCell>
              <TableCell>${booking.price}</TableCell>
              <TableCell>
                {moment(booking.bookedDate).format('MMM DD, YYYY')}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === 'confirmed' ? 'default' : 'destructive'
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <FaEllipsisV className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleOpenUpdateModal(booking)}
                    >
                      Update Date
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openReviewModal(booking)}>
                      Add Review
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => openCancelModal(booking)}
                      disabled={cancelBookingMutation.isLoading}
                    >
                      Cancel Booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modals - no Dialog wrapper needed since modals handle their own */}
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
