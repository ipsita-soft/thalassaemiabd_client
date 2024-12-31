import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Loader2 } from 'lucide-react';
import { useCreateImportantLinkMutation } from '@/api/ImportantLinkApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Add: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createlink] = useCreateImportantLinkMutation();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('The title field is required.'), 
    image: Yup.string().required('The image field is required.'),
    url: Yup.string().required('The url field is required.'),
    description: Yup.string().required('The description field is required.'),
    sorting_index: Yup.number()
      .required('The sorting index field is required.')
      .typeError('Sorting index must be a number.'),
    status: Yup.number().required('The status field is required.'),
  });

  const handleSubmit = async (values: any, { setErrors, resetForm }: any) => {
    setLoading(true);
    try {
      await createlink(values).unwrap();
      setOpen(false);
      resetForm();
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
            image: null,
            url: '',
            description: '',
            sorting_index: '',
            status: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
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
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={(event) =>
                      setFieldValue('image', event.currentTarget.files ? event.currentTarget.files[0] : null)
                    }
                    className="form-control"
                  />
                  <ErrorMessage name="image" component="div" className="text-danger" />
                </div>

                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Url
                  </label>
                  <Field
                    name="url"
                    type="url"
                    placeholder="Enter Link"
                    className="form-control"
                  />
                  <ErrorMessage name="url" component="div" className="text-danger" />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <ReactQuill
                    value={values.description}
                    onChange={(value) => setFieldValue('description', value)}
                    style={{ height: '300px',  marginBottom:'50px'}} 
                  />
                  <ErrorMessage name="description" component="div" className="text-danger" />
                </div>


                {/* Status */}
                <div className=''>
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
                <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
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

export default Add;
