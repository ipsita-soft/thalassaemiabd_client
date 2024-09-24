import React, { useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteSliderApi } from '@/redux/api/slliderApi';
import { Button } from '@/components/ui/button';

interface DeleteSliderProps {
  id: string;
  onSuccess: () => void;
}

const DeleteSlider: React.FC<DeleteSliderProps> = ({ id, onSuccess }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteSliderApi(id);
      onSuccess(); // Call the success handler after deletion
      setIsModalVisible(false); // Hide the modal after deletion
    } catch (error) {
      console.error('Error deleting slider:', error);
      setIsModalVisible(false); // Hide the modal even if there's an error
    }
  };

  const showConfirmDialog = () => {
    setIsModalVisible(true); // Show the modal
  };

  const hideConfirmDialog = () => {
    setIsModalVisible(false); // Hide the modal
  };

  return (
    <>
      <Button onClick={showConfirmDialog} variant="destructive" className="mr-2 mt-1 w-40">
        Delete
      </Button>

      {isModalVisible && (
        <div className="react-confirm-alert-overlay">
          <div className="react-confirm-alert">
            <h1>Confirm Deletion</h1>
            <p>Are you sure you want to delete this slider?</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={handleDelete}>Yes</button>
              <button onClick={hideConfirmDialog}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteSlider;
