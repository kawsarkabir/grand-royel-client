import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    image: '/placeholder.svg?height=800&width=1600',
    title: 'Your Dream Getaway Awaits',
    description:
      'Experience unparalleled luxury and comfort in the heart of the city. Book your perfect stay with us.',
    buttonText: 'Explore Rooms',
    buttonLink: '/rooms',
  },
  {
    id: 2,
    image: '/placeholder.svg?height=800&width=1600',
    title: 'Indulge in Serenity',
    description:
      'Escape the everyday and immerse yourself in tranquility. Our serene rooms offer the ultimate relaxation.',
    buttonText: 'View Suites',
    buttonLink: '/rooms',
  },
  {
    id: 3,
    image: '/placeholder.svg?height=800&width=1600',
    title: 'Adventure at Your Doorstep',
    description:
      'Located near vibrant attractions, our hotel is the perfect base for your next adventure.',
    buttonText: 'Discover More',
    buttonLink: '/rooms',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[92vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image || '/placeholder.svg'}
            alt={slide.title}
            className="z-0 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center p-4">
            <div className="max-w-3xl space-y-4 text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl">
                {slide.description}
              </p>
              <Link href={slide.buttonLink}>
                <Button size="lg" className="mt-6">
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
        onClick={goToPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
