import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { update } from '@/redux/slices/doctorSliderSlice';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';


type MyData = {
  id: string;
  sorting_index: number;
  status: 'Active' | 'Inactive';
  name: string;

};

type EditSliderProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Edit: React.FC<EditSliderProps> = ({ Id }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{
    image: File | null;
    sorting_index: number | null;
    status: number;
    name: string | null;
  }>({
    image: null,
    sorting_index: null,
    status: 2,
    name: null,
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const doctorSliders = useSelector((state: RootState) => state.doctorSliders.doctorSliders);
  const Error = useSelector((state: RootState) => state.events.error);

  const ToEdit = doctorSliders.find((doctorSliders) => doctorSliders.id.toString() === Id) as MyData | undefined;

  useEffect(() => {
    if (ToEdit) {
      setFormData({
        image: null,
        sorting_index: ToEdit.sorting_index,
        status: ToEdit.status === 'Active' ? 1 : 2,
        name: ToEdit.name,
      });
    }
  }, [ToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();
    Data.append('image', formData.image || '');
    Data.append('sorting_index', formData.sorting_index?.toString() || '');
    Data.append('status', formData.status.toString());
    Data.append('name', formData.name?.toString() || '');
    console.log(Error);
    try {
      await dispatch(update({ id: Id, data: Data }));

      toast({
        title: 'Success',
        description: 'Data updated successfully!',
      });
      setOpen(true);
    } catch (error) {
      console.error('Data to update :', error);
      toast({
        title: 'Error',
        description: 'Failed to update Data. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!ToEdit) {
    return null; // Or render a loading state
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-slate-300 text-white hover:bg-slate-400 transition">Edit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">


            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={formData.name !== null ? formData.name : ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter Name"
                required
              />
            </div>



            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                id="image"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                placeholder="Choose Image"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sorting_index">Sorting Index</Label>
              <Input
                type="number"
                id="sorting_index"
                value={formData.sorting_index || ''}
                onChange={(e) => setFormData({ ...formData, sorting_index: e.target.value ? +e.target.value : null })}
                placeholder="Enter Sorting Index"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status.toString()}
                onValueChange={(value) => setFormData({ ...formData, status: +value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="2">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Submit</Button>
            <p className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 transition" onClick={() => setOpen(false)}>
              Cancel
            </p>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
