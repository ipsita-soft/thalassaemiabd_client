import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { useState } from 'react';
import { useMedicalHistoryQuery } from '@/api/medicalHistoryApi';



type EditSliderProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Show: React.FC<EditSliderProps> = ({ Id }) => {


  const [open, setOpen] = useState(false);
  
  const { data, isLoading, isError } = useMedicalHistoryQuery(Id);
  const toShow = data?.data;
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data?.data) {
    return <p>Error loading data. Please try again later.</p>;
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-blue-300 text-white hover:bg-blue-400 transition">Show</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-lg shadow-lg bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{toShow.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
         
          <div className="grid gap-2">
            <Label htmlFor="sorting_index" className="font-medium text-gray-700">Sorting Index</Label>
            <span className="text-lg text-gray-800">{toShow.sorting_index}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status" className="font-medium text-gray-700">Status</Label>
            <span className={`text-sm ${toShow.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {toShow.status}
            </span>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={() => setOpen(false)} className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Show;
