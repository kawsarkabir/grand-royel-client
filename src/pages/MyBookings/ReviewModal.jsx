/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
// import useAuth from "@/hooks/useAuth"; // if you have a user hook

export function ReviewModal({ isOpen, onClose, booking }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const { user } = useAuth();

  useEffect(() => {
    if (booking) {
      setRating(0);
      setComment('');
      setError(null);
    }
  }, [booking]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post('/reviews', {
        roomId: booking.roomId,
        bookingId: booking.id,
        userId: user.id,
        username: user.username,
        rating,
        comment,
        timestamp: new Date().toISOString(),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['room-details', booking.roomId]); // if using cache
      queryClient.invalidateQueries(['my-bookings']);
      toast.success('Reviews post successfully!');
      onClose();
    },
    onError: () => {
      setError('Failed to submit review. Please try again.');
    },
  });

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setError('Please provide a rating.');
      return;
    }
    if (comment.trim() === '') {
      setError('Please write a comment.');
      return;
    }

    mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Your Stay at {booking.roomName}</DialogTitle>
          <DialogDescription>
            Share your experience to help other travelers.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Your Name</Label>
            <Input value={user.displayName} readOnly disabled />
          </div>

          <div className="grid gap-2">
            <Label>Rating (1-5 Stars)</Label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    i < rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => handleStarClick(i + 1)}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Comment</Label>
            <Textarea
              placeholder="Tell us about your stay..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
