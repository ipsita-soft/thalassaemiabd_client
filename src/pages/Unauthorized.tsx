import React from 'react';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-4 bg-white shadow rounded" style={{ maxWidth: '400px' }}>
        <h1 className="display-4 text-danger text-lg mb-3">Unauthorized</h1>
        <p className="text-muted mb-3">
          You do not have permission to access this page.
        </p>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
