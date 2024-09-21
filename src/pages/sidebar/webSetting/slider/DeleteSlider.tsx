import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteSliderApi } from '@/redux/api/slliderApi';

interface DeleteSliderProps {
  id: string;
  onSuccess: () => void;
}

const DeleteSlider: React.FC<DeleteSliderProps> = ({ id, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await deleteSliderApi(id);
      onSuccess(); 
    } catch (error) {
      console.error('Error deleting slider:', error);
    }
  };

  const showConfirmDialog = () => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this slider?',
      buttons: [
        {
          label: 'Yes',
          onClick: handleDelete,
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <button onClick={showConfirmDialog} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteSlider;
