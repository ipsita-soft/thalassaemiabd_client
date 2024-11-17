
import { deleteApi } from '@/redux/api/galleryApi';
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

interface DeleteSliderProps {
  Id: string;
  onSuccess: () => void;
}

const Delete: React.FC<DeleteSliderProps> = ({ Id, onSuccess }) => {

  const handleDelete = async () => {
    try {
      await deleteApi(Id);
      onSuccess(); // Call the success handler after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <AlertDialog>
      {/* Trigger the dialog when the delete button is clicked */}
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="mr-2 mt-1 w-40">
          Delete
        </Button>
      </AlertDialogTrigger>

      {/* Dialog Content */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction className='bg-black text-white mt-2' onClick={handleDelete}>Yes, Delete</AlertDialogAction>
          <AlertDialogCancel>No</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
