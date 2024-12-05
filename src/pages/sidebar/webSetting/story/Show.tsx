import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';

type BlogNew = {
  id: string;
  sorting_index: number;
  image: string;
  title: string;
  description: string;
  status: 'Active' | 'Inactive';
};

type EditSliderProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Show: React.FC<EditSliderProps> = ({ Id }) => {
  const [open, setOpen] = useState(false);
  const blogNews = useSelector((state: RootState) => state.blogNews.blogNews);
  const sliderToShow = blogNews.find((blogNews) => blogNews.id.toString() === Id) as BlogNew | undefined;

  console.log(sliderToShow);
  if (!sliderToShow) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-blue-300 text-white hover:bg-blue-400 transition">Show</Button>
      </DialogTrigger>
      <DialogContent 
        className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-lg shadow-lg bg-white p-6"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}  // Ensures scrollability if content overflows
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold"> {sliderToShow.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="image" className="font-medium text-gray-700">Image</Label>
            <div className="flex justify-center">
              {sliderToShow.image ? (
                <img src={sliderToShow.image} alt="Slider" className="w-full h-auto rounded-md shadow-sm" />
              ) : (
                <span className="text-gray-500">No image available</span>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sorting_index" className="font-medium text-gray-700">Sorting Index</Label>
            <span className="text-lg text-gray-800">{sliderToShow.sorting_index}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status" className="font-medium text-gray-700">Status</Label>
            <span className={`text-sm ${sliderToShow.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {sliderToShow.status}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="font-medium text-gray-700">Description</Label>
            {sliderToShow.description}
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={() => setOpen(false)} className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Show;
