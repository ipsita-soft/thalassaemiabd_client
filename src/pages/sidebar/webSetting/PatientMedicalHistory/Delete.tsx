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
import { useDeletePatientMedicalHistoryMutation } from '@/api/patientMedicalHistoryApi';
import { Trash } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface DeleteSliderProps {
  Id: string;
  onSuccess: () => void;
}
const Delete: React.FC<DeleteSliderProps> = ({ Id, onSuccess }) => {
  const [deleteMedicalHistory, { isLoading }] = useDeletePatientMedicalHistoryMutation();


  const handleDelete = async () => {
    try {
      await deleteMedicalHistory(Id).unwrap();
      onSuccess();
    } catch (error) {
      console.error('Error deleting data:', error);

    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          title="Delete"
          variant="outline"
          className={`flex items-center justify-center rounded-full 
            p-0 w-8 h-8 bg-transparent border border-red-300 
            hover:bg-red-100 hover:border-red-400 transition-all 
            focus:ring-2 focus:ring-red-300 disabled:opacity-50`}
          disabled={isLoading}
          onClick={handleDelete}
        >
          {isLoading ? (
            <Spinner className="w-5 h-5 text-red-600" />
          ) : (
            <Trash className="w-5 h-5 text-red-600" />
          )}
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