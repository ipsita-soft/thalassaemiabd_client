import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { useFetchFinancialDonationQuery, useUpdateFinancialDonationMutation } from '@/api/financialDonationApi';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Loader2 } from 'lucide-react';
type EditProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Edit: React.FC<EditProps> = ({ Id }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    description: '',
    status: 1,
    sorting_index: 0,
  });



  const { data } = useFetchFinancialDonationQuery(Id);

  const [updateFinancialDonation, { isLoading: loading }] = useUpdateFinancialDonationMutation();

  useEffect(() => {
    if (data?.data) {
      const { title, description, status, sorting_index } = data.data;
      setFormData({
        title: title || '',
        image: null,
        description: description || '',
        status: status === 'Active' ? 1 : 2,
        sorting_index: sorting_index || 0,
      });
    }
  }, [data]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('The title field is required.'),
    description: Yup.string().required('The description field is required.'),
    sorting_index: Yup.number()
      .required('The sorting index field is required.')
      .typeError('Sorting index must be a number.'),
    status: Yup.number().required('The status field is required.'),
  });

  const handleSubmit = async (values: typeof formData, { setErrors }: any) => {
    try {

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('_method', 'PUT');
      formData.append('description', values.description);
      // formData.append('image', values.image || '');
      formData.append('status', values.status.toString());
      formData.append('sorting_index', values.sorting_index.toString());

      if (values.image) {
        formData.append('image', values.image);
      }


      await updateFinancialDonation({
        id: Id,
        data: formData,
      }).unwrap();

      Swal.fire({
        title: 'Success!',
        text: 'Data updated successfully!',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
      });
      window.location.reload();

      setOpen(false);
    } catch (error: any) {
      setErrors(error?.data.data || {});
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-slate-300 text-white hover:bg-slate-400 transition">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Financia Donation</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="grid gap-4">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Enter Title"
                    className="form-control"
                  />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </div>

                {/* Image */}
                {/* <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
               

                   <input
                    type="file"
                    id="image"
                    accept="image/jpeg,image/png,image/jpg,image/gif"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue('image', e.target.files[0]); // Save the file to Formik state
                      }
                    }}
                    className="form-control"
                  />
                  <ErrorMessage name="image" component="div" className="text-danger" />
                </div> */}

                <input
                  name="image"
                  type="file"
                  className="form-control pt-2"
                  onChange={(event: any) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("image", file);
                  }}
                />

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <ReactQuill
                    value={values.description}
                    onChange={(value) => setFieldValue('description', value)}
                    style={{ height: '200px', marginBottom: '50px' }}
                  />
                  <ErrorMessage name="description" component="div" className="text-danger" />
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <Field as="select" name="status" className="form-control">
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-danger" />
                </div>

                {/* Sorting Index */}
                <div>
                  <label htmlFor="sorting_index" className="block text-sm font-medium text-gray-700">
                    Sorting Index
                  </label>
                  <Field
                    name="sorting_index"
                    type="number"
                    placeholder="Enter Sorting Index"
                    className="form-control"
                  />
                  <ErrorMessage name="sorting_index" component="div" className="text-danger" />
                </div>
              </div>

              {/* Actions */}
              <DialogFooter className="mt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>

                <Button type="button" className="ml-2 bg-gray-300 text-gray-800 hover:bg-gray-400" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
