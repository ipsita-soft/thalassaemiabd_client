import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { add } from '@/redux/slices/storySlice';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import ReactQuill from 'react-quill';

const NewBlogNewsModal: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: undefined as File | undefined,
    title: null as string | null,
    description: null as string | null,
    sorting_index: null as number | null,
    status: 1,
  });
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const sliderData = new FormData();
    if (formData.image) {
      sliderData.append('image', formData.image);
    }
    sliderData.append('title', (formData.title ?? '').toString());
    sliderData.append('description', (formData.description ?? '').toString());
    sliderData.append('sorting_index', (formData.sorting_index ?? 0).toString());
    sliderData.append('status', formData.status.toString());

    try {
      await dispatch(add(sliderData));
      toast({
        title: "Success",
        description: "Blog News added successfully!",
      });


      setFormData({
        image: undefined,
        title: null,
        description: null,
        sorting_index: null,
        status: 1,
      });

      setOpen(false);
    } catch (error) {
      console.error("Failed to data News:", error);
      toast({
        title: "Error",
        description: "Failed to data News. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add New </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">


            <div className="grid gap-2">
              <Label htmlFor="title"> Title</Label>
              <Input
                type="text"
                id="title"
                value={formData.title !== null ? formData.title : ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value || null })}
                placeholder="Enter title"
                required
              />
            </div>


            {/* <div className="grid gap-2">
              <Label htmlFor="description"> Description</Label>
              <Input
                type="textarea"
                id="description"
                value={formData.description !== null ? formData.description : ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
                placeholder="Enter description"
                required
              />

            </div> */}


            <div className="mb-2">
              <Label htmlFor="description">Description</Label>
              <ReactQuill
                value={formData.description !== null ? formData.description : ''}
                onChange={(value) => setFormData({ ...formData, description: value })}
                className="react-quill-container "
              />
            </div>


            <div className="grid gap-2">
              <Label htmlFor="image">Image </Label>
              <Input
                type="file"
                id="image"
                onChange={(e) => setFormData({ ...formData, image: e.target.files ? e.target.files[0] : undefined })}
                placeholder="Choose Image"
                required
              />
            </div>


            <div className="grid gap-2">
              <Label htmlFor="sorting_index">Sorting Index</Label>
              <Input
                type="number"
                id="sorting_index"
                value={formData.sorting_index !== null ? formData.sorting_index : ''}
                onChange={(e) => setFormData({ ...formData, sorting_index: e.target.value ? +e.target.value : null })}
                placeholder="Enter Sorting Index"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                defaultValue={formData.status.toString()}
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

export default NewBlogNewsModal;
