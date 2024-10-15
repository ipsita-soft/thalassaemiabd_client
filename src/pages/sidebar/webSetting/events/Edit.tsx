import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { update } from '@/redux/slices/eventsSlice';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/redux/store';
// import { DateTimePicker } from '@/components/ui/datetime-picker';

type MyData = {
  id: string;
  sorting_index: number;
  status: 'Active' | 'Inactive';
  title: string;
  date: string;
  description: string;
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
    title: string | null;
    description: string | null;
    date: Date | undefined;
    status: number;
  }>({
    image: null,
    sorting_index: null,
    title: null,
    description: null,
    date: undefined,
    status: 2,
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events.events);
  // const eventsError = useSelector((state: RootState) => state.events.error);
  // console.log(eventsError)

  const eventsToEdit = events.find((event) => event.id.toString() === Id) as MyData | undefined;

  useEffect(() => {
    if (eventsToEdit) {
      setFormData({
        image: null,
        sorting_index: eventsToEdit.sorting_index,
        title: eventsToEdit.title,
        description: eventsToEdit.description,
        date: new Date(eventsToEdit.date), // Convert string to Date
        status: eventsToEdit.status === 'Active' ? 1 : 2,
      });
    }
  }, [eventsToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();
    if (formData.image) {
      Data.append('image', formData.image);
    }
    Data.append('sorting_index', formData.sorting_index?.toString() || '');
    Data.append('title', formData.title || '');
    Data.append('description', formData.description || '');
    Data.append('status', formData.status.toString());
    const formattedDate = formData.date
      ? new Date(formData.date.getTime() + 6 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]
      : '';
    Data.append('date', formattedDate);
    try {
      await dispatch(update({ id: Id, data: Data }));

      toast({
        title: 'Success',
        description: 'Data updated successfully!',
      });
      setOpen(false);
    } catch (error) {
      console.error('Data to update :', error);
      toast({
        title: 'Error',
        description: 'Failed to update Data. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!eventsToEdit) {
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
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value || null })}
                placeholder="Enter title"
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
              <Label htmlFor="description">Description</Label>
              <Input
                type="textarea"
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
                placeholder="Enter description"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label> <br />

              <Input
                  type="date"
                  id="date"
                  value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value ? new Date(e.target.value) : undefined })}
                  required
                />

              {/* <DateTimePicker
                value={formData.date || undefined}
                onChange={(date) => setFormData({ ...formData, date: date || undefined })}
              /> */}
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
