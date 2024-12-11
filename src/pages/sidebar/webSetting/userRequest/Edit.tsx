import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { update } from '@/redux/slices/userRequestSlice'; // Ensure this action exists
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/redux/store'; // Import RootState to use selector


type EditSliderProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const EditSliderModal: React.FC<EditSliderProps> = ({ Id }) => {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{
    name: string | null;
    status: string | null;
  }>({
    name: null,
    status: null,
  });
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const sliders = useSelector((state: RootState) => state.userRequestData.requests);

  const sliderToEdit = sliders.find((slider) => slider.id.toString() === Id);


  console.log(sliderToEdit);



  useEffect(() => {


    if (sliderToEdit) {

      console.log(sliderToEdit);
      setFormData({
        name: sliderToEdit.name,
        status: sliderToEdit.status === 'Approved'
          ? '1'
          : sliderToEdit.status === 'Not Approved'
            ? '2'
            : sliderToEdit.status === 'Pending'
              ? '3'
              : sliderToEdit.status === 'Rejected'
                ? '4'
                : sliderToEdit.status === 'InActive'
                  ? '5'
                  : null,
      });
    }
  }, [sliderToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const reqData = new FormData();

    reqData.append('name', formData.name?.toString() || ''); // Convert to string
    reqData.append('status', formData.status || ''); // Convert to string

    try {
      await dispatch(update({ id: Id, data: reqData }));
      toast({
        title: 'Success',
        description: 'Data updated successfully!',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to update Data:', error);
      toast({
        title: 'Error',
        description: 'Failed to update Data. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!sliderToEdit) {
    return null; // Or render a loading state
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-slate-300 text-white hover:bg-slate-400 transition ">Edit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">

            <div className="grid gap-2">
              <Label htmlFor="sorting_index">Sorting Index</Label>
              <Input 
                type="text"
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value ? '' : null })}
                placeholder="Enter Sorting Index"
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>

              <Select
                value={formData.status || undefined}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Approved</SelectItem>
                  <SelectItem value="2">Not Approved</SelectItem>
                  <SelectItem value="3">Pending</SelectItem>
                  <SelectItem value="4">Rejected</SelectItem>
                  <SelectItem value="5">InActive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Submit</Button>
            <p className='btn bg-gray-300 text-gray-800 hover:bg-gray-400 transition ' onClick={() => setOpen(false)}>Cancel</p>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSliderModal;
