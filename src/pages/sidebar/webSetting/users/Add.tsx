import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { add } from '@/redux/slices/adminUserSlice';
import { fetchDepartments, fetchRoles } from '@/redux/slices/commonSlice';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Loader2 } from 'lucide-react';
import SelectField from '@/components/common/SelectField';

import { get } from "@/redux/slices/adminUserSlice"


const Add: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();



  const { roles, departments } = useSelector((state: RootState) => state.commonData);

  const roleOption = roles.map((role: any) => ({
    value: role.id,
    label: role.name
  }));


  const departmentsOptions = departments.map((dep: any) => ({
    value: dep?.id,
    label: dep?.name,
  }));



  useEffect(() => {
    dispatch(fetchDepartments({}));
    dispatch(fetchRoles({}));
  }, [dispatch]);



  const validationSchema = Yup.object().shape({
    name: Yup.string().required('The name field is required.'),
    phone: Yup.string().required('The phone field is required.').matches(/^[0-9]{11}$/, 'Phone number must be exactly 11 digits.'),
    email: Yup.string().email('Invalid email format').required('The email field is required.'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('The password field is required.'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required('The password confirmation field is required.'),
    department_id: Yup.string().required('The department field is required.'),
    designation: Yup.string().required('The designation field is required.'),
    emergency_contact: Yup.string().required('The emergency contact field is required.').matches(/^[0-9]{11}$/, 'Phone number must be exactly 11 digits.'),
    role_id: Yup.string().required('The marital role field is required.'),
  });

  const handleSubmit = async (values: any, setErrors: any) => {
    setLoading(true);
    try {
      await dispatch(add(values)).unwrap();
      Swal.fire({
        title: 'Success!',
        text: 'User registered successfully! Please Login',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      dispatch(get({}));

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
      console.log('Transformed errors:', formikErrors);
      setErrors(formikErrors);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New</Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-xl shadow-2xl bg-white p-8 border border-gray-200"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <DialogHeader>
          <DialogTitle>Add New Users</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            name: '',
            phone: '',
            email: '',
            password: '',
            password_confirmation: '',
            department_id: '',
            designation: '',
            emergency_contact: '',
            role_id: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
        >
          {() => (
            <Form>
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="patient-form">
                    <div className=" form-group mb-2">
                      <Field name="name" type="text" placeholder="Name" className="form-control" />
                      <ErrorMessage name="name" component="div" className="text-danger" />

                    </div>
                    <div className='row'>
                      <div className="col-md-6">
                        <div className=" form-group mb-2">
                          <Field name="phone" type="text" placeholder="Phone" className="form-control" />
                          <ErrorMessage name="phone" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className=" form-group mb-2">
                          <Field name="email" type="email" placeholder="Email" className="form-control" />
                          <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                      </div>
                    </div>
                    <div className=" form-group mb-2">
                      <Field name="password" type="password" placeholder="Password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <div className=" form-group mb-2">
                      <Field name="password_confirmation" type="password" placeholder="Confirm Password" className="form-control" />
                      <ErrorMessage name="password_confirmation" component="div" className="text-danger" />
                    </div>

                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6 col-lg-6">
                  <div className="patient-form">

                    <div className=" form-group mb-2">
                      <Field
                        name="department_id"
                        component={SelectField}
                        options={departmentsOptions}
                        placeholder="Select Department"
                      />
                      <ErrorMessage name="department_id" component="div" className="text-danger" />
                    </div>



                    <div className=" form-group mb-2">
                      <Field name="designation" type="text" placeholder="Designation" className="form-control" />
                      <ErrorMessage name="designation" component="div" className="text-danger" />
                    </div>


                    {/* Family Information */}
                    <div className=" form-group mb-2">
                      <Field name="emergency_contact" type="text" placeholder="Emergency Contact" className="form-control" />
                      <ErrorMessage name="emergency_contact" component="div" className="text-danger" />
                    </div>


                    <div className=" form-group mb-2">


                      <Field
                        name="role_id"
                        component={SelectField}
                        options={roleOption}
                        placeholder="Select Role"
                      />

                      <ErrorMessage name="role_id" component="div" className="text-danger" />
                    </div>



                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : 'Submit'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default Add;
