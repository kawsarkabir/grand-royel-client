/* RoomDetailsPage.jsx */
import { useParams } from 'react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Wifi, ChevronDown } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useRoom } from '@/hooks/useRoom';
import { useRoomReviews } from '@/hooks/useRoomReviews';
import { BookingModal } from './BookingModal';
import { RoomReviews } from './RoomReviews';
import { iconMap } from '@/utils/iconMap';
import { useQueryClient } from '@tanstack/react-query';

export default function RoomDetailsPage() {
  const queryClient = useQueryClient();
  const { id: roomId } = useParams();
  const { data: room, isLoading: roomLoading } = useRoom(roomId);
  const { data: reviews = [], isLoading: reviewsLoading } =
    useRoomReviews(roomId);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (roomLoading) return <LoadingSpinner />;
  if (!room) return toast.error('Room not found!');

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
        {/* Left Column */}
        <div className="grid gap-8">
          {/* Image Gallery */}
          <section className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            <div className="relative col-span-full lg:col-span-2 xl:col-span-3 h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-xl overflow-hidden">
              <img
                src={room.images[0] || '/placeholder.svg'}
                alt={room.name}
                className="object-center object-cover w-full h-full"
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
                  className="object-center object-cover w-full h-full"
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
                    spacious en-suite bathroom, comfortable seating area, Smart
                    TV, minibar, and balcony with skyline views.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Separator />

            <div className="grid gap-4">
              <h2 className="text-2xl font-semibold">What this place offers</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room?.amenities?.map((amenity, index) => {
                  const Icon = iconMap[amenity.icon] || Wifi;
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <span>{amenity.name}</span>
                    </li>
                  );
                })}
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

            {/* Conditional Booking Button */}
            {room.available ? (
              <>
                <Button
                  className="w-full py-3 text-lg"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book Now
                </Button>
                <BookingModal
                  isOpen={isBookingModalOpen}
                  onClose={() => setIsBookingModalOpen(false)}
                  room={room}
                  onBookingSuccess={() => {
                    queryClient.invalidateQueries(['room', roomId]); // 🔄 refetch room
                    setIsBookingModalOpen(false); // close modal
                  }}
                />
              </>
            ) : (
              <>
                <Button
                  className="w-full py-3 text-lg cursor-not-allowed opacity-60"
                  disabled
                >
                  Not Available
                </Button>
                <p className="text-sm text-destructive text-center mt-2">
                  This room is currently unavailable.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Reviews Section */}
      <section className="grid gap-8">
        <h2 className="text-3xl font-bold">Reviews ({reviews.length})</h2>
        {reviewsLoading ? (
          <LoadingSpinner />
        ) : (
          <RoomReviews reviews={Array.isArray(reviews) ? reviews : []} />
        )}
      </section>
    </div>
  );
}
