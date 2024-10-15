import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Adjust the import based on your slice location
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@radix-ui/react-alert-dialog';
import { AppDispatch } from '@/redux/store';

const Logout = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear user data from Redux store
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button 
            onClick={() => setOpen(true)} 
            className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-md"
          >
            <span>Logout</span>
          </Button>
        </AlertDialogTrigger>
        
        {/* Modal Content */}
        <AlertDialogContent
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
            <AlertDialogTitle className="text-lg font-bold">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="mt-2">
              Are you sure you want to log out? Your session will be terminated.
            </AlertDialogDescription>
            <div className="mt-4 flex justify-center space-x-4">
              <AlertDialogCancel 
                className="btn bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="btn bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
              >
                Logout
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Logout;
