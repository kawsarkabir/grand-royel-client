import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/my-bookings', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Booking fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel a booking
  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this booking?',
    );
    if (!confirmCancel) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          },
        },
      );

      if (res.ok) {
        alert('Booking cancelled successfully!');
        fetchBookings(); // Refresh data
      } else {
        alert('Failed to cancel booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error while cancelling booking.');
    }
  };

  // Placeholder: Update date
  const handleUpdate = (bookingId) => {
    alert(`You clicked Update Date for booking ID: ${bookingId}`);
    // You can implement modal and date picker here
  };

  // Placeholder: Submit review
  const handleReview = (bookingId) => {
    alert(`You clicked Review for booking ID: ${bookingId}`);
    // You can implement modal for review here
  };

  if (loading)
    return <div className="text-center py-20">Loading bookings...</div>;

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Bookings Yet</h2>
        <p className="text-muted-foreground">
          You haven’t booked any rooms yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Room</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Booked Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-200">
                <td className="p-3">
                  <img
                    src={booking.roomImage || '/placeholder.jpg'}
                    alt={booking.roomName}
                    className="w-20 h-14 object-cover rounded-md"
                  />
                </td>
                <td className="p-3 font-medium">{booking.roomName}</td>
                <td className="p-3">${booking.price}</td>
                <td className="p-3">
                  {moment(booking.bookedDate).format('MMM DD, YYYY')}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-yellow-600 hover:underline"
                    onClick={() => handleUpdate(booking.id)}
                  >
                    Update Date
                  </button>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleReview(booking.id)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
