import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';

import { useDeleteLabTestServiceItemMutation } from "@/api/labTestServiceItemApi";



interface DeleteSliderProps {
  Id: string;
  onSuccess: () => void;
}
const Delete: React.FC<DeleteSliderProps> = ({ Id, onSuccess }) => {
  const [deletelabtest, { isLoading }] = useDeleteLabTestServiceItemMutation();
 

  const handleDelete = async () => {
    try {
      await deletelabtest(Id).unwrap(); 
      onSuccess(); 
    } catch (error) {
      console.error('Error deleting data:', error);

    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="mr-2 mt-1 w-40" disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction className='bg-black text-white mt-2' onClick={handleDelete} disabled={isLoading}>
            Yes, Delete
          </AlertDialogAction>
          <AlertDialogCancel disabled={isLoading}>No</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;