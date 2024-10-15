import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';

type Gallery = {
  id: string;
  image: string;
  video_url: string;
  type: string;
  sorting_index: number;
  status: 'Active' | 'Inactive';
};

type EditSliderProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Show: React.FC<EditSliderProps> = ({ Id }) => {
  const [open, setOpen] = useState(false);
  const galleries = useSelector((state: RootState) => state.galleries.galleries);
  const galleriesToShow = galleries.find((gallery) => gallery.id.toString() === Id) as Gallery | undefined;

  console.log(galleriesToShow);
  if (!galleriesToShow) {
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
          <DialogTitle className="text-xl font-semibold"> {galleriesToShow.type}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {galleriesToShow.type === 'photo' && (
            <div className="grid gap-2">
              <Label htmlFor="image" className="font-medium text-gray-700">Image</Label>
              <div className="flex justify-center">
                {galleriesToShow.image ? (
                  <img src={galleriesToShow.image} alt="Slider" className="w-full h-auto rounded-md shadow-sm" />
                ) : (
                  <span className="text-gray-500">No image available</span>
                )}
              </div>
            </div>
          )}

          {galleriesToShow.type === 'video' && (
            <div className="grid gap-2">
              <Label htmlFor="video_url" className="font-medium text-gray-700">Video URL</Label>
              <a href={galleriesToShow.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {galleriesToShow.video_url}
              </a>
            </div>
          )}

          <div className='grid grid-cols-2'>
            <div className="">
              <Label htmlFor="status" className="font-medium text-gray-700">Status:</Label>
              <span className={`text-sm ${galleriesToShow.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {galleriesToShow.status}
              </span>
            </div>

            <div className="">
              <Label htmlFor="sorting_index" className="font-medium text-gray-700">Sorting Index</Label>
              <span className="text-gray-800">: {galleriesToShow.sorting_index}</span>
            </div>
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
