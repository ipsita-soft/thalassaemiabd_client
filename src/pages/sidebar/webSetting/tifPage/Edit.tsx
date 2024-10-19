import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { update } from '@/redux/slices/pagesSlice';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';
type MyData = {
  id: string;
  title?: string;
  image?: string;
  description?: string;
  videolink?: string;
  type?: string;
  status: "Active" | "Inactive";
};

type EditSliderProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Edit: React.FC<EditSliderProps> = ({ Id }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image: null as File | null,
    description: '',
    videolink: '',
    type: '',
    status: 1,
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const galleries = useSelector((state: RootState) => state.pages.tifPages);

  const ToEdit = galleries.find((galleries) => galleries.id.toString() === Id) as MyData | undefined;

  useEffect(() => {
    if (ToEdit) {
      setFormData({
        title: ToEdit.title || '',
        image: null,
        description: ToEdit.description || '',
        videolink: ToEdit.videolink || '',
        type: ToEdit.type || '',
        status: ToEdit.status === 'Active' ? 1 : 2,
      });
    }
  }, [ToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();
    if (formData.image) {
      Data.append('image', formData.image);
    }
    Data.append('title', formData.title.toString());
    Data.append('description', formData.description.toString());
    Data.append('videolink', formData.videolink || '');
    Data.append('type', formData.type);
    Data.append('status', formData.status.toString());

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

  if (!ToEdit) {
    return null; // Render nothing if no data to edit
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-slate-300 text-white hover:bg-slate-400 transition">Edit</Button>
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
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>


            <div className="mt-4">
              <Label htmlFor="description">Description</Label>
              <ReactQuill
                value={formData.description !== null ? formData.description : ''}
                onChange={(value) => setFormData({ ...formData, description: value })}

              />
            </div>


            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                disabled
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tif_member">Tif Member</SelectItem>
                  <SelectItem value="awareness">Awareness</SelectItem>
                  <SelectItem value="advertisements">Advertisements</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                id="image"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="video_url">Video URL</Label>
              <Input
                type="url"
                id="video_url"
                value={formData.videolink}
                onChange={(e) => setFormData({ ...formData, videolink: e.target.value })}
                placeholder="Enter Video URL"
                required
              />
            </div>



          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Submit</Button>
            <Button className="ml-2 bg-gray-300 text-gray-800 hover:bg-gray-400" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
