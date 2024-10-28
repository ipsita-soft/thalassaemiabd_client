import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { add } from '@/redux/slices/whoWeAreSlice';
import { fetchPublicYearList } from '@/redux/slices/publicSlice';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const Add: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    image: undefined as File | undefined,
    sorting_index: null as number | null,
    name: null as string | null,
    type: null as string | null,
    designation: null as string | null,
    phone: null as string | null,
    year_id: null as string | null,
    status: 1,
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const { yearList, isLoading, isError, error } = useSelector((state: RootState) => state.public);



  useEffect(() => {
    dispatch(fetchPublicYearList({}));
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error}</p>;

  const yearLists = Array.isArray(yearList?.data) ? yearList.data : [];

  const validatePhone = (phone: string | null): boolean => {
    const phonePattern = /^01[3-9]\d{8}$/; // Bangladesh phone number pattern
    return phonePattern.test(phone ?? '');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the submission starts

    // Phone number validation
    if (!validatePhone(formData.phone)) {
      setPhoneError('Phone number must be a valid 11-digit Bangladeshi number starting with 01');
      setLoading(false); // Stop loading if validation fails
      return;
    }
    setPhoneError(null);

    const Data = new FormData();
    if (formData.image) {
      Data.append('image', formData.image);
    }

    Data.append('status', formData.status.toString());
    Data.append('sorting_index', (formData.sorting_index ?? 0).toString());
    Data.append('name', (formData.name ?? '').toString());
    Data.append('designation', formData.designation?.toString() || '');
    Data.append('type', formData.type?.toString() || '');
    Data.append('phone', formData.phone ?? '');
    Data.append('year_id', formData.year_id ?? '');

    try {
      await dispatch(add(Data)).unwrap(); // Unwrap to catch the error message
      toast({
        title: "Success",
        description: "Data added successfully!",
      });

      setFormData({
        image: undefined,
        sorting_index: null,
        name: null,
        phone: null,
        status: 1,
        type: null,
        designation: null,
        year_id: null,
      });
      setOpen(false);
    } catch (error: any) {

      toast({
        title: 'Member Not Created',
        description: error.phone ? `${error.phone[0]}` : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Always set loading to false when done
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add New Who We Are</DialogTitle>
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="text"
                  id="phone"
                  value={formData.phone !== null ? formData.phone : ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter 11-digit BD Phone Number"
                  required
                />
                {phoneError && <p className="text-red-600">{phoneError}</p>}
              </div>

              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  type="file"
                  id="image"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files ? e.target.files[0] : undefined })}
                  placeholder="Choose Image"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">


              <div>
                <Label htmlFor="year_id">Years</Label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, year_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
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
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={formData.status.toString()}
                  onValueChange={(value) => setFormData({ ...formData, status: +value })}
                  required
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  defaultValue={formData?.type?.toString()}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  required
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

              <div>
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
            </div>

          </div>

          <DialogFooter className="mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Submit'
              )}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Add;
