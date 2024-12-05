import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';

type ShowData = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Show: React.FC<ShowData> = ({ Id }) => {
  const [open, setOpen] = useState(false);
  const data = useSelector((state: RootState) => state.rolesData.roles);
  const dataToShow = data.find((data) => data.id.toString() === Id);

  if (!dataToShow) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition rounded-md shadow-md">
          Show
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-lg shadow-2xl bg-white p-6 border border-gray-200"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 capitalize border-b pb-2 mb-4">
            {dataToShow?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {dataToShow.permissions.map((per: any, index: number) => (
            <div
              key={index}
              className="p-2 bg-gray-50 rounded-md border border-gray-200 text-gray-700 shadow-sm"
            >
              {per.name}
            </div>
          ))}
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Show;
