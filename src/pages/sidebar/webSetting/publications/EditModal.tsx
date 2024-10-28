import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { update } from '@/redux/slices/publicationsSlice'; // Ensure this action exists
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/redux/store'; // Import RootState to use selector
import ReactQuill from 'react-quill';
type MyData = {
  id: string;
  sorting_index: number;
  status: 'Active' | 'Inactive';
  title: string;
  description: string;
};

type EditSliderProps = {
  BlogNewsId: string;
  open: boolean;
  onClose: () => void;
};

const EditModal: React.FC<EditSliderProps> = ({ BlogNewsId }) => {


  console.log(BlogNewsId);


  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{
    image: File | null;
    sorting_index: number | null;
    title: string | null;
    description: string | null;
    status: number;
  }>({
    image: null,
    sorting_index: null,
    title: null,
    description: null,
    status: 2,
  });
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const blogNews = useSelector((state: RootState) => state.publications.publications);

  const blogNewsError = useSelector((state: RootState) => state.blogNews.error);

  const blogNewsToEdit = blogNews.find((blogNew) => blogNew.id.toString() === BlogNewsId) as MyData | undefined;



  useEffect(() => {
    if (blogNewsToEdit) {


      setFormData({
        image: null,
        sorting_index: blogNewsToEdit.sorting_index,
        title: blogNewsToEdit.title,
        description: blogNewsToEdit.description,
        status: blogNewsToEdit.status === 'Active' ? 1 : 2,
      });
    }
  }, [blogNewsToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();
    Data.append('image', formData.image || '');
    Data.append('sorting_index', formData.sorting_index?.toString() || '');
    Data.append('title', formData.title?.toString() || '');
    Data.append('description', formData.description?.toString() || '');
    Data.append('status', formData.status.toString());
    console.log(blogNewsError);
    try {
      await dispatch(update({ id: BlogNewsId, data: Data }));

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

  if (!blogNewsToEdit) {
    return null; // Or render a loading state
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-slate-300 text-white hover:bg-slate-400 transition">Edit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Edit </DialogTitle>
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

            <div className='grid grid-cols-2 gap-2'>
              <div className="..">
                <Label htmlFor="image">Image</Label>
                <Input
                  type="file"
                  id="image"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                  placeholder="Choose Image"
                />
              </div>


              <div className="..">
                <Label htmlFor="sorting_index">Sorting Index</Label>
                <Input
                  type="number"
                  id="sorting_index"
                  value={formData.sorting_index || ''}
                  onChange={(e) => setFormData({ ...formData, sorting_index: e.target.value ? +e.target.value : null })}
                  placeholder="Enter Sorting Index"
                />
              </div>
            </div>


            <div className="mb-2">
              <Label htmlFor="description">Description</Label>
              <ReactQuill
                value={formData.description !== null ? formData.description : ''}
                onChange={(value) => setFormData({ ...formData, description: value })}

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

export default EditModal;
