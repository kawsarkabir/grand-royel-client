// import { useEffect, useState } from 'react';
// import { BookingTable } from '@/components/my-bookings/booking-table';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router';

// // Dummy data for user bookings
// const dummyBookings = [
//   {
//     id: 'booking1',
//     roomId: 'room1',
//     roomName: 'Deluxe City View Room',
//     roomImage: '/placeholder.svg?height=100&width=150',
//     price: 250,
//     bookedDate: '2024-07-20', // YYYY-MM-DD
//     status: 'confirmed',
//   },
//   {
//     id: 'booking2',
//     roomId: 'room3',
//     roomName: 'Standard Double Room',
//     roomImage: '/placeholder.svg?height=100&width=150',
//     price: 180,
//     bookedDate: '2024-08-10',
//     status: 'confirmed',
//   },
//   {
//     id: 'booking3',
//     roomId: 'room6',
//     roomName: 'Garden View Room',
//     roomImage: '/placeholder.svg?height=100&width=150',
//     price: 220,
//     bookedDate: '2024-07-15',
//     status: 'cancelled', // Example of a cancelled booking
//   },
// ];

// export default function MyBookingsPage() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const router = useRouter();

// //   useEffect(() => {
// //     // In a real app, check for JWT token or Firebase auth state
// //     const token = localStorage.getItem('jwt_token');
// //     if (!token) {
// //       router.push('/login'); // Redirect to login if not authenticated
// //     } else {
// //       setIsLoggedIn(true);
// //       // In a real app, fetch user-specific bookings here
// //     }
// //   }, [router]);

// //   if (!isLoggedIn) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-12 px-4 text-center">
// //         <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
// //         <p className="text-muted-foreground mb-6">
// //           Please log in to view your bookings.
// //         </p>
// //         <Link href="/login">
// //           <Button>Go to Login</Button>
// //         </Link>
// //       </div>
// //     );
// //   }

//   return (
//     <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
//       <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
//         My Bookings
//       </h1>
//       {dummyBookings.length === 0 ? (
//         <div className="text-center text-muted-foreground py-12">
//           <p className="text-lg mb-4">You haven&apos;t booked any rooms yet.</p>
//           <Link href="/rooms">
//             <Button>Explore Rooms</Button>
//           </Link>
//         </div>
//       ) : (
//         <BookingTable bookings={dummyBookings} />
//       )}
//     </div>
//   );
// }
export default function MyBookings() {
  return (
    <>
      <h1>my boking</h1>
    </>
  );
}
