import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    image:
      'https://image.pollinations.ai/prompt/Your%20Dream%20Getaway%20Awaits?width=1600&height=800&seed=17797&model=flux',
    title: 'Your Dream Getaway Awaits',
    description:
      'Experience unparalleled luxury and comfort in the heart of the city. Book your perfect stay with us.',
    buttonText: 'Explore Rooms',
    buttonLink: '/rooms',
  },
  {
    id: 2,
    image:
      'https://image.pollinations.ai/prompt/Indulge%20in%20Serenity?width=1600&height=800&seed=13708&model=flux',
    title: 'Indulge in Serenity',
    description:
      'Escape the everyday and immerse yourself in tranquility. Our serene rooms offer the ultimate relaxation.',
    buttonText: 'View Suites',
    buttonLink: '/rooms',
  },
  {
    id: 3,
    image:
      'https://image.pollinations.ai/prompt/Adventure%20at%20Your%20Doorstep?width=1600&height=800&seed=79250&model=flux',
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


  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[92vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
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
              <Link to={slide.buttonLink}>
                <Button size="lg" className="mt-6">
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
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
