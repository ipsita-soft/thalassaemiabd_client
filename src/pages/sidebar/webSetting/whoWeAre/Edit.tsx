import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { update } from '@/redux/slices/whoWeAreSlice';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { fetchPublicYearList } from '@/redux/slices/publicSlice';
import ReactQuill from 'react-quill';

type MyData = {
  id: number;
  image: string;
  name: string;
  designation: string;
  description: string;
  type: string;
  year_id: string;
  sorting_index: number;
  status: 'Active' | 'Inactive';
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
    type: string | null;
    year_id: string | null;
    designation: string | null;
    description: string | null;
  }>({
    image: null,
    sorting_index: null,
    status: 2,
    name: null,
    type: null,
    year_id: null,
    designation: null,
    description: null,
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const whoWeAres = useSelector((state: RootState) => state.whoWeAres.whoWeAres);
  const { yearList, isLoading, isError, error } = useSelector((state: RootState) => state.public);
  const ToEdit = whoWeAres.find((whoWeAres) => whoWeAres?.id?.toString() === Id) as MyData | undefined;

  useEffect(() => {
    if (ToEdit) {
      setFormData({
        image: null,
        sorting_index: ToEdit.sorting_index ?? null,
        status: ToEdit.status === 'Active' ? 1 : 2,
        name: ToEdit.name ?? null,
        type: ToEdit.type ?? null,
        year_id: ToEdit.year_id ?? null,
        designation: ToEdit.designation ?? null,
        description: ToEdit.description ?? null,
      });
    }
  }, [ToEdit]);

  useEffect(() => {
    dispatch(fetchPublicYearList({}));
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error}</p>;

  const yearLists = Array.isArray(yearList?.data) ? yearList.data : [];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();
    Data.append('image', formData.image || '');
    Data.append('sorting_index', formData.sorting_index?.toString() || '');
    Data.append('status', formData.status.toString());
    Data.append('name', formData.name?.toString() || '');
    Data.append('designation', formData.designation?.toString() || '');
    Data.append('description', formData.description?.toString() || '');
    Data.append('type', formData.type?.toString() || '');
    Data.append('year_id', formData.year_id ?? '');

    try {
      await dispatch(update({ id: Id, data: Data })).unwrap();
      toast({
        title: 'Success',
        description: 'Data updated successfully!',
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: 'Member Not Created',
        description: error?.response?.data?.phone
          ? error.response.data.phone[0]
          : 'An unexpected error occurred',
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
        <Button className="mr-2 mt-1 w-40 bg-slate-300 text-white hover:bg-slate-400 transition">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
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
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  type="text"
                  id="designation"
                  value={formData.designation !== null ? formData.designation : ''}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="Enter Designation"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="year_id">Year</Label>
                <Select
                  value={formData.year_id || undefined}
                  onValueChange={(value) => setFormData({ ...formData, year_id: value })}
                >
                  <SelectTrigger>
                    {/* <SelectValue placeholder="Select Year" /> */}

                    <SelectValue>
                      {yearLists.find((year) => year.id.toString() == formData.year_id)?.date || 'Select Year'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {yearLists.map((year) => (
                      <SelectItem key={year.id} value={year.id.toString()}>
                        {year.date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  type="file"
                  id="image"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                  placeholder="Choose Image"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="sorting_index">Sorting Index</Label>
                <Input
                  type="number"
                  id="sorting_index"
                  value={formData.sorting_index || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    sorting_index: e.target.value ? +e.target.value : null,
                  })}
                  placeholder="Enter Sorting Index"
                />
              </div>
              <div>
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

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData?.type?.toString()}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ec-committee">Ec Committee</SelectItem>
                  <SelectItem value="advisors">Advisors</SelectItem>
                  <SelectItem value="blood-collection-committee">Blood Collection Committee</SelectItem>
                  <SelectItem value="zakat-board">Zakat Board</SelectItem>
                </SelectContent>
              </Select>
            </div>


            <div className="mb-2">
              <Label htmlFor="description">Description</Label>
              <ReactQuill
                value={formData.description !== null ? formData.description : ''}
                onChange={(value) => setFormData({ ...formData, description: value })}
                className="react-quill-container "
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Submit</Button>
            <Button className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
