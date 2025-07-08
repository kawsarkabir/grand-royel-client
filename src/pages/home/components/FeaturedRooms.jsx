import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Link } from 'react-router';

const featuredRooms = [
  {
    id: 'room1',
    name: 'Deluxe City View Room',
    description: 'Enjoy stunning cityscapes from your private balcony.',
    price: 250,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 'room2',
    name: 'Executive Suite',
    description:
      'Spacious suite with a separate living area and premium amenities.',
    price: 450,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.9,
    reviews: 85,
  },
  {
    id: 'room3',
    name: 'Standard Double Room',
    description: 'Comfortable and cozy, perfect for a relaxing stay.',
    price: 180,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.5,
    reviews: 200,
  },
  {
    id: 'room4',
    name: 'Family Connecting Room',
    description: 'Two connecting rooms ideal for families with children.',
    price: 350,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.7,
    reviews: 95,
  },
  {
    id: 'room5',
    name: 'Oceanfront Villa',
    description:
      'Private villa with breathtaking ocean views and direct beach access.',
    price: 700,
    image: '/placeholder.svg?height=300&width=400',
    rating: 5.0,
    reviews: 50,
  },
  {
    id: 'room6',
    name: 'Garden View Room',
    description: 'Peaceful room overlooking our lush, manicured gardens.',
    price: 220,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.6,
    reviews: 150,
  },
];

export function FeaturedRooms() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 text-center mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Our Featured Rooms
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed mb-12">
          Discover our most popular and highly-rated rooms, designed for your
          ultimate comfort and luxury.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <Card
              key={room.id}
              className="flex flex-col overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
            >
              <Link
                href={`/rooms/${room.id}`}
                className="block relative h-48 w-full overflow-hidden"
              >
                <img
                  src={room.image || '/placeholder.svg'}
                  alt={room.name}
                  className="transition-transform duration-300 hover:scale-105 object-cover"
                />
              </Link>
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl font-semibold">
                  {room.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {room.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">${room.price}</div>
                <span className="text-sm text-muted-foreground">/ night</span>
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-0">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {room.rating} ({room.reviews} reviews)
                  </span>
                </div>
                <Link to={`/rooms/${room.id}`}>
                  <Button size="sm">Book Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
