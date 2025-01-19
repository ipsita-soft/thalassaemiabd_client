import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Loader2 } from 'lucide-react';
import { useCreateMedicineItemMutation } from '@/api/medicineItemApi';

const Add: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createMedicine] = useCreateMedicineItemMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('The name field is required.'),
    outdoor_rate: Yup.number()
      .nullable()
      .min(0, 'Outdoor rate must be a positive number.'),
    indoor_rate: Yup.number()
      .nullable()
      .min(0, 'Indoor rate must be a positive number.'),
    subsidy: Yup.number()
      .nullable()
      .min(0, 'Subsidy must be a positive number.'),
    sorting_index: Yup.number()
      .nullable()
      .min(0, 'Sorting index must be a positive number.')
      .required('The sorting index field is required.'),
    status: Yup.string().required('The status field is required.'),
  });

  const handleSubmit = async (values: any, { setErrors }: any) => {
    setLoading(true);
    console.log('Form submitted with values:', values);
    try {
      const response = await createMedicine(values).unwrap();
      console.log('API Response:', response);
      setOpen(false);
      Swal.fire({
        title: 'Success!',
        text: 'Medicine added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error: any) {
      console.error('API Error:', error); // Debug log
      setErrors(error?.data?.data || {});
      Swal.fire({
        title: 'Error!',
        text: error?.data?.message || 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"> Add New </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-3xl mx-auto rounded-xl shadow-2xl bg-white p-8 border border-gray-200"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <DialogHeader>
          <DialogTitle>Add New Medicine</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            name: '',
            outdoor_rate: null,
            indoor_rate: null,
            subsidy: null,
            sorting_index: null,
            status: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <Field
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="form-control"
                  />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    name="outdoor_rate"
                    type="number"
                    placeholder="Outdoor Rate"
                    className="form-control"
                  />
                  <ErrorMessage name="outdoor_rate" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    name="indoor_rate"
                    type="number"
                    placeholder="Indoor Rate"
                    className="form-control"
                  />
                  <ErrorMessage name="indoor_rate" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    name="subsidy"
                    type="number"
                    placeholder="Subsidy"
                    className="form-control"
                  />
                  <ErrorMessage name="subsidy" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    name="sorting_index"
                    type="number"
                    placeholder="Sorting Index"
                    className="form-control"
                  />
                  <ErrorMessage name="sorting_index" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    as="select"
                    name="status"
                    className="form-control"
                  >
                    <option value="" label="Select status" />
                    <option value="1" label="Active" />
                    <option value="2" label="Inactive" />
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-danger" />
                </div>
              </div>
              <div className="flex justify-end mt-6">
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
