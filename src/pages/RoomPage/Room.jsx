import { useState } from 'react';
import { useRooms } from '@/hooks/useRooms';
import { RoomCard } from './components/RoomCard';
import { RoomFilter } from './components/RoomFilter';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RoomsPage() {
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filterApplied, setFilterApplied] = useState(false);

  const {
    data: rooms,
    isLoading,
    error,
  } = useRooms({
    minPrice: filterApplied ? minPrice : null,
    maxPrice: filterApplied ? maxPrice : null,
  });
  console.log(rooms);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error fetching rooms</div>;

  return (
    <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <RoomFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            onApplyFilter={() => setFilterApplied(true)}
          />
        </aside>
        <section className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Our Rooms</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms?.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
