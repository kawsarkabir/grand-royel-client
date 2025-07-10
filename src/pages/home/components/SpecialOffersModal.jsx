import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export function SpecialOffersModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the modal after a short delay on component mount
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // Opens after 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-lg">
        <div className="relative h-48 w-full">
          <img
            src="https://image.pollinations.ai/prompt/Adventure%20at%20Your%20Doorstep?seed=79250&model=flux"
            alt="Special Offer"
            className="rounded-t-lg object-cover h-48 w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
            <h3 className="text-2xl font-bold text-white">
              Exclusive Summer Deal!
            </h3>
          </div>
        </div>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl">
            Save Big on Your Next Stay!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Book now and get up to 30% off on all room types for stays this
            summer. Limited time offer!
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-0 text-sm text-muted-foreground">
          <p className="mb-2">
            Use code:{' '}
            <span className="font-semibold text-primary">SUMMER30</span> at
            checkout.
          </p>
          <p>Valid for bookings made before August 31st, 2024.</p>
        </div>
        <DialogFooter className="p-6 pt-0 items-center justify-between">
          <div className="w-full">
            <Link to="/rooms" className="pt-0">
              <Button onClick={() => setIsOpen(false)}>Book Now</Button>
            </Link>
          </div>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            No Thanks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
