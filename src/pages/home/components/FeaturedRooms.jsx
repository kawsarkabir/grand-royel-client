import { useEffect, useState } from 'react';
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
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';

export function FeaturedRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get('/rooms');
        setRooms(res.data.slice(0, 6));
      } catch (error) {
        toast.error('Failed to fetch featured rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6   mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Our Featured Rooms
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed mb-12">
          Discover our most popular and highly-rated rooms, designed for your
          ultimate comfort and luxury.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card
              key={room._id}
              className="flex flex-col overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
            >
              <Link
                to={`/rooms/${room._id}`}
                className="block relative h-48 w-full overflow-hidden"
              >
                <img
                  src={room.images?.[0] || '/placeholder.svg'}
                  alt={room.name}
                  className="transition-transform duration-300 hover:scale-105 object-cover w-full h-full"
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
                    {room.rating || 0} ({room.totalReviews || 0} reviews)
                  </span>
                </div>
                <Link to={`/rooms/${room._id}`}>
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
