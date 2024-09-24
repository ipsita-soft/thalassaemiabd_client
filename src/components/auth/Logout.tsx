import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Adjust the import based on your slice location
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
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
      <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setOpen(true)} className='flex items-center space-x-2 bg-secondary  text-white px-4 py-2 rounded-md'>
            <span>Logout</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
            zIndex: 9999, // Ensure it's above other content
          }}
        >
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '400px',
            textAlign: 'center',
          }}>
            <AlertDialogTitle >Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? Your session will be terminated.
            </AlertDialogDescription>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
              <AlertDialogCancel className='btn bg-slate-300' onClick={() => setOpen(false)} style={{ marginRight: '1rem' }}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className='btn text-white bg-red-600'
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
