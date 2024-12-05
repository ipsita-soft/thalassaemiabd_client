import React, { useState } from 'react';

interface EditPatientProps {
  patient: any;
  onClose: () => void;
}

const EditPatient: React.FC<EditPatientProps> = ({ patient, onClose }) => {
  const [editedPatient, setEditedPatient] = useState(patient);

  const handleSave = () => {
    // Logic to update patient info (e.g., call an API)
    alert('Patient info saved');
    onClose(); // Close the modal after saving
  };

  return (
    <div>
      <h2>Edit Patient</h2>
      <label>
        Name:
        <input
          type="text"
          value={editedPatient.name}
          onChange={(e) => setEditedPatient({ ...editedPatient, name: e.target.value })}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={editedPatient.patientInfo?.address}
          onChange={(e) => setEditedPatient({ ...editedPatient, patientInfo: { ...editedPatient.patientInfo, address: e.target.value } })}
        />
      </label>
      {/* Add other fields as needed */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditPatient;
