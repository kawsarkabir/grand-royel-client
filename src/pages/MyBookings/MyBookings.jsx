import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get('/bookings/my-bookings');
        setBookings(res.data);
      } catch (err) {
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (bookings.length === 0)
    return <p className="text-center mt-10">You have no bookings.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex gap-4 items-center">
              <img
                src={booking.roomImage}
                alt={booking.roomName}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h2 className="font-bold text-lg">{booking.roomName}</h2>
                <p className="text-sm text-muted-foreground">
                  Date: {booking.date}
                </p>
                <p className="text-sm text-muted-foreground">
                  Guests: {booking.guests}
                </p>
                <p className="font-semibold text-primary">
                  ${booking.roomPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
