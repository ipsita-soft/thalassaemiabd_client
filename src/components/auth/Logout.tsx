import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
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
import { LogOut } from 'lucide-react';

// Define prop types for LogoutButton
interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const defaultClasses = "flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-md";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          onClick={() => setOpen(true)} 
          className={className ? `${defaultClasses} ${className}` : defaultClasses}
        >
         <LogOut className="h-5 w-5" />  <span>Logout</span>
        </Button>
      </AlertDialogTrigger>
      
      {/* Modal Content */}
      <AlertDialogContent className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
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
  );
};

export default LogoutButton;
