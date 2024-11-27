
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
import {
  useCreateMedicalHistoryItemMutation,
} from '@/api/medicalHistoryItemApi';
import {
  useFetchMedicalHistoriesQuery,
} from '@/api/medicalHistoryApi'
import SelectField from '@/components/common/SelectField';

const Add: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createMedical] = useCreateMedicalHistoryItemMutation();

  const [perPage] = useState(250);
  const search = '';
  const currentPage = 1;
  const status = '1';
  const { data: medicalHistories } =
    useFetchMedicalHistoriesQuery({
      perPage,
      search,
      page: currentPage,
      status
    });



  const medicalHistoriesOption = medicalHistories?.data.map((digt: any) => ({
    value: digt?.id,
    label: digt?.title,
  }));

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('The title field is required.'),
    sorting_index: Yup.string().required('The sorting index field is required.'),
    status: Yup.string().required('The status field is required.'),
    medical_history_id: Yup.string().required('The medical history id field is required.'),
  });

  const handleSubmit = async (values: any, { setErrors }: any) => {
    setLoading(true);
    try {
      await createMedical(values).unwrap();
      setOpen(false);
      Swal.fire({
        title: 'Success!',
        text: 'Data added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error: any) {
      setErrors(error?.data?.data || {});
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
          <DialogTitle>Add New</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            title: '',
            sorting_index: '',
            status: '',
            medical_history_id: '',
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
                  <ErrorMessage
                    name="sorting_index"
                    component="div"
                    className="text-danger"
                  />
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
                <div className="col-md-6 mb-4">
                  <Field
                    name="medical_history_id"
                    component={SelectField}
                    options={medicalHistoriesOption}
                    placeholder="Medical History"
                  />
                  <ErrorMessage
                    name="medical_history_id"
                    component="div"
                    className="text-danger"
                  />
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