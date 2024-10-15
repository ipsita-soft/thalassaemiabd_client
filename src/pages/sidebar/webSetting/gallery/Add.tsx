import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { add } from '@/redux/slices/gallerySlice';
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

  const [formData, setFormData] = useState({
    type: null as string | null,
    image: undefined as File | undefined,
    video_url: null as string | null,
    sorting_index: null as number | null,
    status: 1,
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const Data = new FormData();
    if (formData.image) {
      Data.append('image', formData.image);
    }
    Data.append('type', (formData.type ?? '').toString());
    Data.append('video_url', (formData.video_url ?? '').toString());
    Data.append('sorting_index', (formData.sorting_index ?? 0).toString());
    Data.append('status', formData.status.toString());

    try {
      await dispatch(add(Data));
      toast({
        title: "Success",
        description: "Data added successfully!",
      });
      setFormData({
        image: undefined,
        type: null,
        video_url: null,
        sorting_index: null,
        status: 1,
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to add Data:", error);
      toast({
        title: "Error",
        description: "Failed to add Data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add New Gallery</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {/* Type Selection */}
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo">Photo</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditionally render the Image or Video URL field based on type */}
            {formData.type === 'photo' && (
              <div className="..">
                <Label htmlFor="image">Image</Label>
                <Input
                  type="file"
                  id="image"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files ? e.target.files[0] : undefined })}
                  placeholder="Choose Image"
                  required
                />
              </div>
            )}

            {formData.type === 'video' && (
              <div>
                <Label htmlFor="video_url">Video URL</Label>
                <Input
                  type="url"
                  id="video_url"
                  value={formData.video_url !== null ? formData.video_url : ''}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="Enter Video URL"
                  required
                />
              </div>
            )}

            {/* Sorting Index */}
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

            {/* Status */}
            <div>
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

          {/* Submit Button */}
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
