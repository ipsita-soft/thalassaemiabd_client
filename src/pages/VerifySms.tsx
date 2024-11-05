import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { subverifyPhone } from '@/redux/slices/verifySlice';
import { logout } from '@/redux/slices/authSlice'; 
import { AppDispatch, RootState } from '@/redux/store';
import * as Yup from 'yup';
import { useState } from 'react';

function VerifyPhone() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const [showError, setErrorData] = useState('');
  const phone = user.phone; 
  const maskedPhone = `${phone.substring(0, 3)}XXXXX${phone.substring(phone.length - 3)}`;

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required('Code is required')
        .matches(/^[0-9]+$/, 'Only digits are allowed')
        .min(6, 'Code must be at least 6 digits')
        .max(6, 'Code must be 6 digits or less'),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        await dispatch(subverifyPhone({ phone: user.phone, code: values.code })).unwrap();
        Swal.fire({
          title: 'Success!',
          text: 'Phone Number Verification Successful',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-confirm-button',
          },
        });
        
        // Log out the user
        dispatch(logout());
        
        // Navigate to the login page
        navigate('/login');
        
      } catch (error: any) {
        setErrors(error);
        setErrorData('Verification failed. Please try again.');
      }
    },
  });

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verify phone number</CardTitle>
          <CardDescription>
            A new verification code has been sent to your phone number: {maskedPhone}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter Code"
                {...formik.getFieldProps('code')}
              />
              {formik.touched.code && formik.errors.code ? (
                <p className="text-red-500">{formik.errors.code}</p>
              ) : null}
              {showError && <p className="text-red-500">{showError}</p>}
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <div className="mt-4 text-center text-sm w-full">
              Don’t have an account?{' '}
              <Link to="/verification-phone" className="underline">
                Re Send
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}

export default VerifyPhone;
