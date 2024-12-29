import { logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-4">
          <img
            src="https://img.icons8.com/fluency/96/checked--v1.png"
            alt="Success Icon"
            className="h-20 w-20"
          />
        </div>
        <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
        <p className="text-gray-600">
          Thank you for registering with us. Your registration was successful, and your account is
          pending approval by an admin.
        </p>
        <p className="text-gray-600 font-semibold mt-2">
          Once your account is approved, we will notify you via your phone number.
        </p>
        <div className="mt-6">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            onClick={handleLogout}
          >

            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
