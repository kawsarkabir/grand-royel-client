import { RoomFilter } from '@/components/rooms/room-filter';
import { RoomCard } from '@/components/rooms/room-card';

// Dummy data for rooms - in a real app, this would be fetched from a database
const allRooms = [
  {
    id: 'room1',
    name: 'Deluxe City View Room',
    description: 'Enjoy stunning cityscapes from your private balcony.',
    price: 250,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.8,
    reviews: 120,
    amenities: ['Wifi', 'TV', 'Minibar', 'City View'],
    location: 'Downtown',
    isAvailable: true,
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
    amenities: ['Wifi', 'TV', 'Minibar', 'Bathtub', 'Lounge Access'],
    location: 'Downtown',
    isAvailable: true,
  },
  {
    id: 'room3',
    name: 'Standard Double Room',
    description: 'Comfortable and cozy, perfect for a relaxing stay.',
    price: 180,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.5,
    reviews: 200,
    amenities: ['Wifi', 'TV'],
    location: 'Downtown',
    isAvailable: true,
  },
  {
    id: 'room4',
    name: 'Family Connecting Room',
    description: 'Two connecting rooms ideal for families with children.',
    price: 350,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.7,
    reviews: 95,
    amenities: ['Wifi', 'TV', 'Connecting Door'],
    location: 'Downtown',
    isAvailable: true,
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
    amenities: ['Wifi', 'TV', 'Private Pool', 'Ocean View', 'Beach Access'],
    location: 'Beachfront',
    isAvailable: true,
  },
  {
    id: 'room6',
    name: 'Garden View Room',
    description: 'Peaceful room overlooking our lush, manicured gardens.',
    price: 220,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.6,
    reviews: 150,
    amenities: ['Wifi', 'TV', 'Garden View'],
    location: 'Downtown',
    isAvailable: true,
  },
  {
    id: 'room7',
    name: 'Penthouse Suite',
    description: 'The ultimate luxury experience with panoramic city views.',
    price: 900,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.9,
    reviews: 30,
    amenities: ['Wifi', 'TV', 'Minibar', 'Jacuzzi', 'Private Balcony'],
    location: 'Downtown',
    isAvailable: true,
  },
  {
    id: 'room8',
    name: 'Cozy Single Room',
    description: 'Perfect for solo travelers seeking comfort and convenience.',
    price: 120,
    image: '/placeholder.svg?height=300&width=400',
    rating: 4.3,
    reviews: 180,
    amenities: ['Wifi', 'TV'],
    location: 'Downtown',
    isAvailable: true,
  },
];

export default function RoomsPage() {
  // In a real application, you would fetch rooms based on filter parameters
  // For this design, we'll just display allRooms and show the filter UI.
  // The filtering logic would typically happen on the server side.

  return (
    <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <RoomFilter />
        </aside>
        <section className="flex-1">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            Our Rooms
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
