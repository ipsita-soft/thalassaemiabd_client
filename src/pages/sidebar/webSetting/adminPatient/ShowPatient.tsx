import React from 'react';

interface ShowPatientProps {
  patient: any;
  onClose: () => void;
}

const ShowPatient: React.FC<ShowPatientProps> = ({ patient, onClose }) => {
  return (
    <div>
      <h2>Patient Details</h2>
      <p><strong>ID:</strong> {patient.id}</p>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Address:</strong> {patient.patientInfo?.address}</p>
      {/* Add other fields as needed */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ShowPatient;
