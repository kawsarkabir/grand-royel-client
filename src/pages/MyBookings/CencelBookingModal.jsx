/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import { toast } from 'sonner';

export function CancelBookingModal({ isOpen, onClose, booking, onConfirm }) {
  const [loading, setLoading] = useState(false);

  const handleConfirmCancellation = async () => {
    setLoading(true);

    const bookingMoment = moment(booking.bookedDate);
    const oneDayBefore = bookingMoment.clone().subtract(1, 'days');
    const now = moment();

    if (now.isSameOrAfter(oneDayBefore)) {
      toast.error(
        '❌ Cancellation is not allowed within 1 day of the booked date.',
      );
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API delay
      onConfirm(booking.id); // Call parent function to cancel
      toast.success('✅ Booking cancelled successfully!');
      onClose();
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Cancellation</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your booking for{' '}
            <span className="font-semibold">{booking.roomName}</span> on{' '}
            <span className="font-semibold">
              {moment(booking.bookedDate).format('MMM DD, YYYY')}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Please note: Cancellations are allowed up to 1 day before the booked
            date.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Keep Booking
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmCancellation}
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Yes, Cancel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
