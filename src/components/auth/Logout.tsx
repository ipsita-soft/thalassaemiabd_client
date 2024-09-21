import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Adjust the import based on your slice location
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';

const Logout = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear user data from Redux store
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
        <AlertDialogTrigger>
          <Button onClick={() => setOpen(true)} className='mb-2'>Logout</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? Your session will be terminated.
          </AlertDialogDescription>
          <div style={{ marginTop: '1rem' }}>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              style={{ marginLeft: '1rem' }}
            >
              Logout
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};


export default Logout;
