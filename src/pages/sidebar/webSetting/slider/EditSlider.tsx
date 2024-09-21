// EditSlider.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { updateSlider } from '@/redux/slices/sliderSlice'; // Add updateSlider action in sliderSlice.tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/redux/store'; // Import RootState to use selector

type EditSliderProps = {
  sliderId: string;
};

const EditSliderModal: React.FC<EditSliderProps> = ({ sliderId }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    sorting_index: null,
    status: 2,
  });
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const sliders = useSelector((state: RootState) => state.sliders.sliders);
  const sliderToEdit = sliders.find((slider) => slider.id === sliderId);

  useEffect(() => {
    if (sliderToEdit) {
      setFormData({
        image: null,
        sorting_index: sliderToEdit.sorting_index,
        status: sliderToEdit.status === 'Active' ? 1 : 2,
      });
    }
  }, [sliderToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault();
    const sliderData = new FormData();
    sliderData.append('image', formData.image ?? '');
    sliderData.append('sorting_index', formData.sorting_index);
    sliderData.append('status', formData.status);
    for (let [key, value] of sliderData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      await dispatch(updateSlider({ id: sliderId, data: sliderData }));
      toast({
        title: 'Success',
        description: 'Slider updated successfully!',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to update slider:', error);
      toast({
        title: 'Error',
        description: 'Failed to update slider. Please try again.',
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
        <Button variant="ghost" className="mr-2" >Edit Slider</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle >Edit Slider</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                id="image"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || '' })}
                placeholder="Choose Image"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sorting_index">Sorting Index</Label>
              <Input
                type="number"
                id="sorting_index"
                value={formData.sorting_index || ''}
                onChange={(e) => setFormData({ ...formData, sorting_index: +e.target.value })}
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
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSliderModal;
