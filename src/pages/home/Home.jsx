import { Button } from '@/components/ui/button';
import { BrushCleaningIcon, CheckCircle, Smile, Star } from 'lucide-react';
import { Link } from 'react-router';
import { HeroSlider } from './components/HeroSlider';
 import { SpecialOffersModal } from './components/SpecialOffersModal';
import { FeaturedRooms } from './components/FeaturedRooms';
import { UserReviewsCarousel } from './components/UserReview';
import HotelMap from './components/HotelMap';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSlider />
      <SpecialOffersModal /> {/* This modal will open on page load */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Discover Our Exceptional Amenities
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                At Hotelio, we believe in providing an unparalleled experience.
                Explore our wide range of amenities designed to make your stay
                unforgettable.
              </p>
              <ul className="grid gap-2 text-lg text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  State-of-the-art Fitness Center
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Luxurious Spa & Wellness Services
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Gourmet Dining Options
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Sparkling Outdoor Pool
                </li>
              </ul>
              <Link href="/rooms">
                <Button size="lg">Explore Rooms</Button>
              </Link>
            </div>
            <img
              src="/placeholder.svg?height=500&width=700"
              width={700}
              height={500}
              alt="Hotel Amenities"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>
      <FeaturedRooms />
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Commitment to Excellence
            </h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
              We are dedicated to providing exceptional service and creating
              memorable experiences for every guest. Our team is committed to
              ensuring your comfort and satisfaction throughout your stay.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-4 p-6 bg-card rounded-lg shadow-sm">
              <Star className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">5-Star Service</h3>
              <p className="text-muted-foreground text-center">
                Experience world-class hospitality from our dedicated staff,
                ready to cater to your every need.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-card rounded-lg shadow-sm">
              <BrushCleaningIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Impeccable Cleanliness</h3>
              <p className="text-muted-foreground text-center">
                We maintain the highest standards of hygiene and cleanliness for
                your peace of mind.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-card rounded-lg shadow-sm">
              <Smile className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Ultimate Comfort</h3>
              <p className="text-muted-foreground text-center">
                Our rooms are designed for maximum comfort, ensuring a restful
                and rejuvenating stay.
              </p>
            </div>
          </div>
        </div>
      </section>
      <UserReviewsCarousel />
      <HotelMap />
    </div>
  );
}
