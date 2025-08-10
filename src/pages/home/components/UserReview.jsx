/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';
import Marquee from 'react-fast-marquee';

export function UserReviewsCarousel() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get('/reviews');
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setReviews(sorted);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return (
      <section className="pb-16 text-center">
        <p className="text-lg text-muted-foreground">
          No reviews available yet.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
          What Our Guests Say
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Real voices from our guests sharing their Hotelio experience.
        </p>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Marquee Line 1 - Left to Right */}
      <Marquee
        speed={90}
        pauseOnHover
        className="mb-3"
        direction="left"
        loop={90}
      >
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </Marquee>

      {/* Marquee Line 2 - Right to Left */}
      <Marquee speed={50} pauseOnHover direction="right" loop={90}>
        {reviews.map((review) => (
          <ReviewCard key={review._id + '-reverse'} review={review} />
        ))}
      </Marquee>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <Card className="w-56 mx-2 shadow-md border bg-card flex-shrink-0 py-0">
      <CardContent className="flex flex-col -space-y-2 items-center text-center gap-2 p-4">
        <Avatar className="h-14 w-14 border">
          <AvatarImage src={review.photoURL} />
          <AvatarFallback>
            {review.username?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm italic text-foreground line-clamp-3">
          &quot;{review.comment}&quot;
        </p>
        <p className="font-semibold text-primary">- {review.username}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(review.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </CardContent>
    </Card>
  );
}
