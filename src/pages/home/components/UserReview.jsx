import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reviews = [
  {
    id: 1,
    user: 'Alice Johnson',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    comment:
      'Absolutely stunning hotel! The service was impeccable, and the room had breathtaking views. Highly recommend!',
    timestamp: '2024-07-05T10:00:00Z',
  },
  {
    id: 2,
    user: 'Bob Williams',
    avatar: '/placeholder-user.jpg',
    rating: 4,
    comment:
      'Great location and comfortable rooms. The staff were very friendly and helpful. Would definitely stay again.',
    timestamp: '2024-07-04T15:30:00Z',
  },
  {
    id: 3,
    user: 'Charlie Brown',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    comment:
      'A truly luxurious experience. Every detail was perfect, from the amenities to the dining. Five stars!',
    timestamp: '2024-07-03T09:15:00Z',
  },
  {
    id: 4,
    user: 'Diana Miller',
    avatar: '/placeholder-user.jpg',
    rating: 4,
    comment:
      'Enjoyed my stay. The pool area was fantastic, and the breakfast buffet was delicious. A bit pricey but worth it.',
    timestamp: '2024-07-02T18:45:00Z',
  },
  {
    id: 5,
    user: 'Eve Davis',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    comment:
      "The best hotel experience I've ever had. The staff went above and beyond to make our anniversary special.",
    timestamp: '2024-07-01T11:20:00Z',
  },
].sort(
  (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
); // Sort by latest timestamp

export function UserReviewsCarousel() {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 7000); // Change review every 7 seconds
    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const goToPrev = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  //   const renderStars = (rating: number) => {
  //     return Array.from({ length: 5 }, (_, i) => (
  //       <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
  //     ))
  //   }

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
              key={review.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentReview
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <Card className="p-6 md:p-8 shadow-lg">
                <CardContent className="flex flex-col items-center text-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage
                      src={review.avatar || '/placeholder.svg'}
                      alt={review.user}
                    />
                    <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {/* <div className="flex gap-1">{renderStars(review.rating)}</div> */}
                  <p className="text-lg italic text-foreground">
                    &quot;{review.comment}&quot;
                  </p>
                  <p className="font-semibold text-primary">- {review.user}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
          <div className="relative h-[250px] md:h-[200px]" />{' '}
          {/* Placeholder height for the absolute cards */}
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
