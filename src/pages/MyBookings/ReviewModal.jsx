// import { Input } from "@/components/ui/input"

// import { useState } from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Star } from "lucide-react"

 

// export function ReviewModal({ isOpen, onClose, booking, onConfirm }) {
//   const [rating, setRating] = useState(0)
//   const [comment, setComment] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   // Dummy user data - in a real app, this would come from authenticated user context
//   const currentUser = {
//     username: "Current User",
//     id: "user123",
//   }

//   const handleStarClick = (selectedRating) => {
//     setRating(selectedRating)
//   }

//   const handleSubmitReview = async () => {
//     if (rating === 0) {
//       setError("Please provide a rating.")
//       return
//     }
//     if (comment.trim() === "") {
//       setError("Please write a comment.")
//       return
//     }

//     setLoading(true)
//     setError(null)

//     // --- Review Submission Logic Placeholder ---
//     // In a real app, send a request to your backend to:
//     // 1. Create a new review record in the database.
//     // 2. Associate it with the room and the current user.
//     // 3. Update room's average rating/total reviews.
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

//       // Simulate successful review submission
//       console.log("Review submitted:", {
//         bookingId: booking.id,
//         roomId: booking.roomId,
//         userId: currentUser.id,
//         username: currentUser.username,
//         rating,
//         comment,
//         timestamp: new Date().toISOString(),
//       })
//       onConfirm(booking.id) // Notify parent component
//       setRating(0)
//       setComment("")
//     } catch (err) {
//       setError("Failed to submit review. Please try again.")
//       console.error("Review submission error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Review Your Stay at {booking.roomName}</DialogTitle>
//           <DialogDescription>Share your experience to help other travelers.</DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label htmlFor="username">Your Username</Label>
//             <Input id="username" value={currentUser.username} readOnly disabled />
//           </div>

//           <div className="grid gap-2">
//             <Label>Rating (1-5 Stars)</Label>
//             <div className="flex gap-1">
//               {Array.from({ length: 5 }, (_, i) => (
//                 <Star
//                   key={i}
//                   className={`h-8 w-8 cursor-pointer transition-colors ${
//                     i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
//                   }`}
//                   onClick={() => handleStarClick(i + 1)}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="comment">Comment</Label>
//             <Textarea
//               id="comment"
//               placeholder="Tell us about your stay..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               rows={4}
//               required
//             />
//           </div>
//           {error && <p className="text-sm text-destructive mt-2">{error}</p>}
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose} disabled={loading}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmitReview} disabled={loading}>
//             {loading ? "Submitting..." : "Submit Review"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }


export default function ReviewModal(){
    return (
         <>
            <h1>review modal</h1>
         </>
    );
}