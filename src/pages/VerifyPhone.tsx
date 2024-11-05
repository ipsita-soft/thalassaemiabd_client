import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { AppDispatch, RootState } from '@/redux/store';
import { userResendVerifyPhone } from '@/redux/slices/verifySlice';
import * as Yup from 'yup';

function VerifySms() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const formik = useFormik({
    initialValues: {
      phone: user.phone,
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Only digits are allowed')
        .min(11, 'Phone number must be at least 11 digits')
        .max(15, 'Phone number must be 15 digits or less'),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        await dispatch(userResendVerifyPhone({ phone: values.phone })).unwrap();
        Swal.fire({
          title: 'Success!',
          text: 'Code Send SuccessFull ',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-confirm-button',
          },
        });
        navigate('/sms-verify');
      } catch (error: any) {
        const formikErrors = Object.entries(error).reduce((acc: any, [key, value]) => {
          const keys = key.split('.');
          const lastKey = keys.pop();
          if (lastKey) {
            let nestedObj = acc;
            keys.forEach((k) => {
              if (!nestedObj[k]) nestedObj[k] = {};
              nestedObj = nestedObj[k];
            });
            nestedObj[lastKey] = value;
          }
          return acc;
        }, {});
        console.log(formikErrors);
        console.log('Transformed errors:', formikErrors);
        setErrors(formikErrors);
        console.log(error);
      }
    },
  });

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verify phone number</CardTitle>
          <CardDescription>
            Enter phone to Verify Your Account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Phone Number"
                {...formik.getFieldProps('phone')}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-500">{formik.errors.phone}</p>
              ) : null}
            </div>
            <Button type="submit" className="w-full">
              Send SMS
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default VerifySms;
