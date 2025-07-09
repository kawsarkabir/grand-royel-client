/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function RoomReviews({ reviews }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No reviews available for this room yet.</p>
        <p className="text-sm mt-2">Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      {reviews?.map((review) => (
        <article key={review._id} className="grid gap-3">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt={review.userEmail} />
              <AvatarFallback>
                {review.userEmail?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid">
              <div className="font-semibold">{review.username}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {renderStars(review.rating)}
                <span>{review.rating}/5</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">{review.comment}</p>
          <div className="text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <Separator />
        </article>
      ))}
    </div>
  );
}
