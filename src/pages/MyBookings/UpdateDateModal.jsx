/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import moment from 'moment';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function UpdateDateModal({ isOpen, onClose, booking }) {
  const [newDate, setNewDate] = useState(moment(booking.bookedDate).toDate());
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (booking) {
      setNewDate(moment(booking.bookedDate).toDate());
      setError(null);
    }
  }, [booking, isOpen]);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        `http://localhost:5000/api/bookings/${booking.id}`,
        { newDate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-bookings']);
      onClose();
    },
    onError: () => {
      setError('Failed to update booking date. Please try again.');
    },
  });

  const handleUpdate = () => {
    if (!newDate) {
      setError('Please select a new date.');
      return;
    }
    mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Booking Date</DialogTitle>
          <DialogDescription>
            Select a new date for your booking of{' '}
            <span className="font-semibold">{booking.roomName}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Current Booking Date:</Label>
            <p className="font-semibold">
              {moment(booking.bookedDate).format('MMM DD, YYYY')}
            </p>
          </div>

          <div className="grid gap-2">
            <Label>Select New Date:</Label>
            <Calendar
              mode="single"
              selected={newDate}
              onSelect={setNewDate}
              initialFocus
              className="rounded-md border mx-auto"
            />
            {newDate && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                New Date:{' '}
                <span className="font-semibold">{format(newDate, 'PPP')}</span>
              </p>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={!newDate || isLoading}>
            {isLoading ? 'Updating...' : 'Update Date'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
