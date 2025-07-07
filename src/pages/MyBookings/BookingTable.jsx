// import { useState } from 'react';
// import Image from 'next/image';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { CancelBookingModal } from '@/components/my-bookings/cancel-booking-modal';
// import { UpdateDateModal } from '@/components/my-bookings/update-date-modal';
// import { ReviewModal } from '@/components/my-bookings/review-modal';
// import Link from 'next/link';
// import moment from 'moment'; // Using moment for date comparison

// export function BookingTable({ bookings }) {
//   const [bookings, setBookings] = useState(initialBookings);
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const handleCancelClick = (booking) => {
//     setSelectedBooking(booking);
//     setIsCancelModalOpen(true);
//   };

//   const handleUpdateClick = (booking) => {
//     setSelectedBooking(booking);
//     setIsUpdateModalOpen(true);
//   };

//   const handleReviewClick = (booking) => {
//     setSelectedBooking(booking);
//     setIsReviewModalOpen(true);
//   };

//   const onBookingCancelled = (bookingId) => {
//     setBookings((prev) =>
//       prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b)),
//     );
//     setIsCancelModalOpen(false);
//     setSelectedBooking(null);
//     alert('Booking cancelled successfully!');
//   };

//   const onBookingDateUpdated = (bookingId, newDate) => {
//     setBookings((prev) =>
//       prev.map((b) =>
//         b.id === bookingId
//           ? { ...b, bookedDate: moment(newDate).format('YYYY-MM-DD') }
//           : b,
//       ),
//     );
//     setIsUpdateModalOpen(false);
//     setSelectedBooking(null);
//     alert(`Booking date updated to ${moment(newDate).format('MMM DD, YYYY')}!`);
//   };

//   const onReviewSubmitted = (bookingId) => {
//     // In a real app, you might update a flag on the booking to indicate review submitted
//     setIsReviewModalOpen(false);
//     setSelectedBooking(null);
//     alert('Review submitted successfully!');
//   };

//   const isCancellable = (bookedDate) => {
//     const bookingMoment = moment(bookedDate);
//     const oneDayBefore = bookingMoment.subtract(1, 'days');
//     const now = moment();
//     return now.isBefore(oneDayBefore);
//   };

//   return (
//     <div className="overflow-x-auto">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Room</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Booked Date</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {bookings.map((booking) => (
//             <TableRow key={booking.id}>
//               <TableCell>
//                 <Link href={`/rooms/${booking.roomId}`}>
//                   <Image
//                     src={booking.roomImage || '/placeholder.svg'}
//                     alt={booking.roomName}
//                     width={100}
//                     height={75}
//                     className="rounded-md object-cover aspect-[4/3]"
//                   />
//                 </Link>
//               </TableCell>
//               <TableCell className="font-medium">
//                 <Link
//                   href={`/rooms/${booking.roomId}`}
//                   className="hover:underline"
//                 >
//                   {booking.roomName}
//                 </Link>
//               </TableCell>
//               <TableCell>${booking.price}</TableCell>
//               <TableCell>
//                 {moment(booking.bookedDate).format('MMM DD, YYYY')}
//               </TableCell>
//               <TableCell>
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                     booking.status === 'confirmed'
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-red-100 text-red-800'
//                   }`}
//                 >
//                   {booking.status}
//                 </span>
//               </TableCell>
//               <TableCell className="text-right space-x-2">
//                 {booking.status === 'confirmed' && (
//                   <>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleUpdateClick(booking)}
//                     >
//                       Update Date
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => handleCancelClick(booking)}
//                       disabled={!isCancellable(booking.bookedDate)}
//                     >
//                       Cancel
//                     </Button>
//                     {!isCancellable(booking.bookedDate) && (
//                       <span className="text-xs text-muted-foreground block mt-1">
//                         (Cancellation not allowed within 1 day of booking)
//                       </span>
//                     )}
//                     <Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={() => handleReviewClick(booking)}
//                     >
//                       Review
//                     </Button>
//                   </>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {selectedBooking && (
//         <>
//           <CancelBookingModal
//             isOpen={isCancelModalOpen}
//             onClose={() => setIsCancelModalOpen(false)}
//             booking={selectedBooking}
//             onConfirm={onBookingCancelled}
//           />
//           <UpdateDateModal
//             isOpen={isUpdateModalOpen}
//             onClose={() => setIsUpdateModalOpen(false)}
//             booking={selectedBooking}
//             onConfirm={onBookingDateUpdated}
//           />
//           <ReviewModal
//             isOpen={isReviewModalOpen}
//             onClose={() => setIsReviewModalOpen(false)}
//             booking={selectedBooking}
//             onConfirm={onReviewSubmitted}
//           />
//         </>
//       )}
//     </div>
//   );
// }
