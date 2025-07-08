// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import { Label } from '@/components/ui/label';
// import { format } from 'date-fns';
// import moment from 'moment';

// export function UpdateDateModal({ isOpen, onClose, booking, onConfirm }) {
//   const [newDate, setNewDate] = useState(moment(booking.bookedDate).toDate());
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Reset newDate when booking changes or modal opens
//   useEffect(() => {
//     setNewDate(moment(booking.bookedDate).toDate());
//     setError(null);
//   }, [booking, isOpen]);

//   const handleConfirmUpdate = async () => {
//     if (!newDate) {
//       setError('Please select a new date.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       console.log(
//         `Booking ${booking.id} date updated to ${format(newDate, 'PPP')}.`,
//       );
//       onConfirm(booking.id, newDate);
//       onClose();
//     } catch (err) {
//       setError('Failed to update booking date. Please try again.');
//       console.error('Update date error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Update Booking Date</DialogTitle>
//           <DialogDescription>
//             Select a new date for your booking of{' '}
//             <span className="font-semibold">{booking.roomName}</span>.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label htmlFor="current-date">Current Booking Date:</Label>
//             <p className="font-semibold">
//               {moment(booking.bookedDate).format('MMM DD, YYYY')}
//             </p>
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="new-date">Select New Date:</Label>
//             <Calendar
//               mode="single"
//               selected={newDate}
//               onSelect={setNewDate}
//               initialFocus
//               className="rounded-md border mx-auto"
//             />
//             {newDate && (
//               <p className="text-sm text-muted-foreground text-center mt-2">
//                 New Date:{' '}
//                 <span className="font-semibold">{format(newDate, 'PPP')}</span>
//               </p>
//             )}
//           </div>

//           {error && <p className="text-sm text-destructive mt-2">{error}</p>}
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={onClose} disabled={loading}>
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmUpdate} disabled={loading || !newDate}>
//             {loading ? 'Updating...' : 'Update Date'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
