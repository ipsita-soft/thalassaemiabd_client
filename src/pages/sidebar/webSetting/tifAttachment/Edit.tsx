import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { update } from '@/redux/slices/pageAttachmentSlice';
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
  type: string;
  title: string;

};

type EditSliderProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Edit: React.FC<EditSliderProps> = ({ Id }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{
    file: File | null;
    title: string | null;
    sorting_index: number | null;
    status: number;
    type: string | undefined;
  }>({
    file: null,
    sorting_index: null,
    status: 2,
    type: '',
    title: '',
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const pageAttachmentSlice = useSelector((state: RootState) => state.tifAttachmentPages.tifAttachmentPages);
  const Error = useSelector((state: RootState) => state.events.error);

  const ToEdit = pageAttachmentSlice.find((pageAttachmentSlice) => pageAttachmentSlice.id.toString() === Id) as MyData | undefined;


  console.log(ToEdit);

  useEffect(() => {
    if (ToEdit) {
      setFormData({
        file: null,
        title: ToEdit.title,
        sorting_index: ToEdit.sorting_index,
        status: ToEdit.status == 'Active' ? 1 : 2,
        type: ToEdit.type,
      });
    }
  }, [ToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();
    Data.append('file', formData.file || '');
    Data.append('title', formData.title?.toString() || '');
    Data.append('sorting_index', formData.sorting_index?.toString() || '');
    Data.append('status', formData.status.toString());
    Data.append('type', formData.type?.toString() || '');
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


            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}

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



            <div className="grid gap-2 d-none">
              <Label htmlFor="sorting_index">Title</Label>
              <Input
                type="title"
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value ? e.target.value : null })}
                placeholder="Enter Sorting Index"
              />
            </div>


            <div className="grid gap-2">
              <Label htmlFor="file">Image</Label>
              <Input
                type="file"
                id="image"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                placeholder="Choose PDF file"
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
                  <SelectItem value="1">Active </SelectItem>
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
