/* eslint-disable react/prop-types */
import { useState } from 'react';
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
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

export function BookingModal({ isOpen, onClose, room, onBookingSuccess }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBookingConfirm = async () => {
    if (!selectedDate) {
      setError('Please select a booking date.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.post('/bookings', {
        roomId: room._id,
        date: selectedDate.toISOString().split('T')[0],
        guests: parseInt(numberOfGuests),
        roomName: room.name,
        roomImage: room.images[0] || '/placeholder.jpg',
        roomPrice: room.price,
      });

      toast.success(res.data.message || 'Room booked successfully!');

      // 🔄 Refetch room + close modal
      if (onBookingSuccess) onBookingSuccess();
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Booking failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = room.price * parseInt(numberOfGuests);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column: Room Details */}
          <div>
            <DialogHeader>
              <DialogTitle>Confirm Your Booking</DialogTitle>
              <DialogDescription>
                Review your room details and select your booking date.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {room.description}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">${room.price}</span>
                <span className="text-muted-foreground">/ night</span>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Inputs */}
          <div className="space-y-2">
            <div className="grid gap-2">
              <Label htmlFor="booking-date">Select Booking Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="rounded-md border w-full"
              />
              {selectedDate && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Selected Date:{' '}
                  <span className="font-semibold">
                    {format(selectedDate, 'PPP')}
                  </span>
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Select value={numberOfGuests} onValueChange={setNumberOfGuests}>
                <SelectTrigger id="guests">
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Total Price */}
        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total:</span>
          <span>${totalAmount}</span>
        </div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        {/* Footer Buttons */}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleBookingConfirm}
            disabled={loading || !selectedDate || !room.available}
          >
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
