import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Loader2 } from 'lucide-react';
import { useCreateMedicalHistoryMutation } from '@/api/medicalHistoryApi';
const Add: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createMedical] = useCreateMedicalHistoryMutation();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('The title field is required.'),
    sorting_index: Yup.string().required('The sorting index field is required.'),
    status: Yup.string().required('The status field is required.'),
  });
  const handleSubmit = async (values: any, { setErrors }: any) => {
    setLoading(true);
    try {
      await createMedical(values).unwrap();
      setOpen(false);
      Swal.fire({
        title: 'Success!',
        text: 'Data Add  successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error: any) {
      setErrors(error?.data.data || {});
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
        className="w-full max-w-3xl mx-auto rounded-xl shadow-2xl bg-white p-8 border border-gray-200"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <DialogHeader>
          <DialogTitle>Add New </DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            title: '',
            sorting_index: '',
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
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="form-control"
                  />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    name="sorting_index"
                    type="text"
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
                    placeholder="Select Status"
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
