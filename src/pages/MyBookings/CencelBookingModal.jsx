// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import moment from 'moment';

// export function CancelBookingModal({ isOpen, onClose, booking, onConfirm }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleConfirmCancellation = async () => {
//     setLoading(true);
//     setError(null);

//     const bookingMoment = moment(booking.bookedDate);
//     const oneDayBefore = bookingMoment.clone().subtract(1, 'days');
//     const now = moment();

//     if (now.isSameOrAfter(oneDayBefore)) {
//       setError('Cancellation is not allowed within 1 day of the booked date.');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       console.log(`Booking ${booking.id} cancelled.`);
//       onConfirm(booking.id);
//       onClose();
//     } catch (err) {
//       setError('Failed to cancel booking. Please try again.');
//       console.error('Cancellation error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Confirm Cancellation</DialogTitle>
//           <DialogDescription>
//             Are you sure you want to cancel your booking for{' '}
//             <span className="font-semibold">{booking.roomName}</span> on{' '}
//             <span className="font-semibold">
//               {moment(booking.bookedDate).format('MMM DD, YYYY')}
//             </span>
//             ?
//           </DialogDescription>
//         </DialogHeader>
//         <div className="py-4">
//           <p className="text-sm text-muted-foreground">
//             Please note: Cancellations are allowed up to 1 day before the booked
//             date.
//           </p>
//           {error && <p className="text-sm text-destructive mt-2">{error}</p>}
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose} disabled={loading}>
//             Keep Booking
//           </Button>
//           <Button
//             variant="destructive"
//             onClick={handleConfirmCancellation}
//             disabled={loading}
//           >
//             {loading ? 'Cancelling...' : 'Yes, Cancel'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
