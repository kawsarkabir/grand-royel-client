import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axiosInstance';

export function UserReviewsCarousel() {
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get('/reviews'); // ✅ Adjust this if your route is different
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setReviews(sorted);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [reviews]);

  const goToNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const goToPrev = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) {
    return (
      <section className="py-24 text-center">
        <p className="text-lg text-muted-foreground">
          No reviews available yet.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          What Our Guests Say
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed mb-12">
          Hear from our satisfied guests about their unforgettable experiences
          at Hotelio.
        </p>

        <div className="relative max-w-3xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={review._id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentReview
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <Card className="p-6 md:p-8 shadow-lg">
                <CardContent className="flex flex-col items-center text-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src={review.photoURL} />
                    <AvatarFallback>
                      {review.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-lg italic text-foreground">
                    &quot;{review.comment}&quot;
                  </p>
                  <p className="font-semibold text-primary">
                    - {review.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}

          <div className="relative h-[250px] md:h-[200px]" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={goToPrev}
            aria-label="Previous review"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={goToNext}
            aria-label="Next review"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentReview
                    ? 'bg-primary w-6'
                    : 'bg-muted-foreground'
                }`}
                onClick={() => setCurrentReview(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
