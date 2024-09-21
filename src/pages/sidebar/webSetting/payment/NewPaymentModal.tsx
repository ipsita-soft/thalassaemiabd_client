import * as React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from '@/components/ui/dialog'; // Adjust path for dialog components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function NewPaymentModal() {
  const [open, setOpen] = React.useState(false);

  const handlePaymentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to API)
    console.log("New payment added");
    setOpen(false); // Close modal after submitting
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Payment</DialogTitle>
          <DialogDescription>
            Fill in the payment details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePaymentSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="payment-amount">Payment Amount</Label>
              <Input type="number" id="payment-amount" placeholder="Enter amount" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Input type="text" id="payment-method" placeholder="Enter method (e.g., Credit Card)" required />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Submit Payment</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewPaymentModal;
