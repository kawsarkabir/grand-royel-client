/* eslint-disable react/prop-types */
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

export function RoomCard({ room }) {
  // Use room.rating if valid number, else 0
  const rating = typeof room.rating === 'number' ? room.rating : 0;
  const reviewsCount = typeof room.reviews === 'number' ? room.reviews : 0;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Link to={`/rooms/${room?._id}`}>
      <Card className="flex flex-col overflow-hidden shadow hover:shadow-md transition-shadow duration-300">
        <div className="block relative h-48 w-full overflow-hidden">
          <img
            src={room.image || '/placeholder.svg'}
            alt={room.name}
            className="transition-transform duration-300 hover:scale-105 object-cover"
          />
        </div>
        <CardHeader className="flex-grow">
          <CardTitle className="text-xl font-semibold">{room.name}</CardTitle>
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
            {renderStars(rating)}
            <span>({reviewsCount} reviews)</span>
          </div>
          <Button size="sm">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
