/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  Wifi,
  Tv,
  Utensils,
  Car,
  Snowflake,
  Sun,
  MapPin,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from './BookingModal';
import { RoomReviews } from './RoomReviews';
import { useRoom } from '@/hooks/useRoom';
import { useParams } from 'react-router';
import LoadingSpinner from '@/components/LoadingSpinner';

const dummyReviews = [
  {
    id: 1,
    username: 'Alice Johnson',
    rating: 5,
    comment:
      'The city view from this room was absolutely incredible! The room was spotless and very comfortable. Highly recommend for a city break.',
    timestamp: '2024-07-05T10:00:00Z',
  },
  {
    id: 2,
    username: 'Bob Williams',
    rating: 4,
    comment:
      'A very pleasant stay. The staff were attentive, and the amenities were great. The bed was super comfy!',
    timestamp: '2024-07-04T15:30:00Z',
  },
  {
    id: 3,
    username: 'Charlie Brown',
    rating: 5,
    comment:
      'Fantastic experience! The location is perfect for exploring the city, and the room itself was a luxurious retreat.',
    timestamp: '2024-07-03T09:15:00Z',
  },
];

export default function RoomDetailsPage() {
  // In a real app, fetch room details and reviews based on params.roomId
  const { id: roomId } = useParams();
  const { data: room, isLoading } = useRoom(roomId);

  // const room = dummyRoom; // Using dummy data for demonstration
  const reviews = dummyReviews; // Using dummy data for demonstration

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (!room) {
    return <div className="container py-12 text-center">Room not found.</div>;
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 lg:py-16 mx-auto">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr] items-start">
        {/* Left Column: Images, Description, Amenities, Host */}
        <div className="grid gap-8">
          {/* Image Gallery */}
          <section className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            <div className="relative col-span-full lg:col-span-2 xl:col-span-3 h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-xl overflow-hidden">
              <img
                src={room.images[0] || '/placeholder.svg'}
                alt={room.name}
                className="object-center object-cover"
              />
            </div>
            {room.images.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className="relative h-32 sm:h-40 rounded-xl overflow-hidden"
              >
                <img
                  src={img || '/placeholder.svg'}
                  alt={`${room.name} - image ${index + 2}`}
                  className="object-center object-cover"
                />
              </div>
            ))}
          </section>

          {/* Room Info */}
          <section className="grid gap-4">
            <h1 className="text-3xl font-bold">{room.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex items-center gap-1">
                {renderStars(room.rating)}
              </div>
              <span>
                {room.rating} ({room.totalReviews} reviews)
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span>{room.location}</span>
            </div>
            <p className="text-lg text-muted-foreground">
              {room.guests} guests · {room.beds} bed · {room.bathrooms} bath
            </p>
            <Separator />
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-2">About this room</h2>
              <p>{room.description}</p>
              <Collapsible>
                <CollapsibleTrigger className="font-semibold flex items-center gap-1 [&[data-state=open]>svg]:rotate-180">
                  Show more
                  <ChevronDown className="w-4 h-4 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>
                    Our Deluxe City View Room is equipped with a king-size bed,
                    a spacious en-suite bathroom with a walk-in shower, and a
                    comfortable seating area. Enjoy complimentary high-speed
                    Wi-Fi, a flat-screen Smart TV, and a well-stocked minibar.
                  </p>
                  <p>
                    The room also features a private balcony where you can
                    unwind and take in the stunning city skyline, especially
                    beautiful at night.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <Separator />
            <div className="grid gap-4">
              <h2 className="text-2xl font-semibold">What this place offers</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.amenities?.map((amenity, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <amenity.icon className="h-5 w-5 text-primary" />
                    <span>{amenity.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <img
                src={room.host.avatar || '/placeholder.svg'}
                alt={room.host.name}
                width={64}
                height={64}
                className="rounded-full border"
              />
              <div>
                <h3 className="text-xl font-semibold">
                  Hosted by {room.host.name}
                </h3>
                <p className="text-muted-foreground">
                  Joined in {room.host.joined}{' '}
                  {room.host.superhost && '· Superhost'}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Booking Card */}
        <div className="sticky top-20 grid gap-4">
          <div className="border rounded-lg p-6 shadow-lg">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold">${room.price}</span>
              <span className="text-muted-foreground">/ night</span>
            </div>
            <div className="flex items-center gap-1 mb-6">
              {renderStars(room.rating)}
              <span className="text-sm text-muted-foreground">
                ({room.totalReviews} reviews)
              </span>
            </div>
            <Button
              className="w-full py-3 text-lg"
              onClick={() => setIsBookingModalOpen(true)}
              disabled={!room.isAvailable}
            >
              {room.isAvailable ? 'Book Now' : 'Not Available'}
            </Button>
            {!room.isAvailable && (
              <p className="text-sm text-destructive text-center mt-2">
                This room is currently unavailable.
              </p>
            )}
            <BookingModal
              isOpen={isBookingModalOpen}
              onClose={() => setIsBookingModalOpen(false)}
              room={room}
            />
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Reviews Section */}
      <section className="grid gap-8">
        <h2 className="text-3xl font-bold">Reviews ({reviews.length})</h2>
        <RoomReviews reviews={reviews} />
        {reviews.length === 0 && (
          <p className="text-muted-foreground text-center text-lg">
            No reviews available for this room yet.
          </p>
        )}
      </section>
    </div>
  );
}
