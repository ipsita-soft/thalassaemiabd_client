import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFetchFounderQuery, useUpdateFounderMutation } from '@/api/founderApi';

type EditFounderProps = {
  Id: string;
};

const EditFounder: React.FC<EditFounderProps> = ({ Id }) => {
  const { toast } = useToast();
  const { data: apiResponse, isLoading } = useFetchFounderQuery(Id);
  const [updateFounder, { isLoading: isUpdating }] = useUpdateFounderMutation();

  const data = apiResponse?.data;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.title || '',
      name: data?.name || '',
      image: undefined,
      designation: data?.designation || '',
      description: data?.description || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      name: Yup.string().required('Name is required'),
      image: Yup.mixed()
        .nullable(),

      designation: Yup.string().required('Designation is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('title', values.title);
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('designation', values.designation);
        if (values.image) {
          formData.append('image', values.image);
        }

        await updateFounder({ id: Id, data: formData }).unwrap();
        toast({
          title: 'Success',
          description: 'Founder details updated successfully!',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update. Please try again.',
          variant: 'destructive',
        });
      }
    },
  });

  useEffect(() => {
    if (!isLoading && !data) {
      toast({
        title: 'Error',
        description: 'Failed to fetch data. Please reload.',
        variant: 'destructive',
      });
    }
  }, [isLoading, data, toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter Title"
          className="form-control"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.title && formik.touched.title && (
          <div className="text-danger">{String(formik.errors.title)}</div>
        )}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter Name"
          className="form-control"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && (
          <div className="text-danger">{String(formik.errors.name)}</div>
        )}
      </div>

      {/* Image */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          className="form-control"
          onChange={(event) => {
            if (event.target.files) {
              formik.setFieldValue('image', event.target.files[0]);
            }
          }}
          onBlur={formik.handleBlur}
        />
        {formik.errors.image && formik.touched.image && (
          <div className="text-danger">{String(formik.errors.image)}</div>
        )}
      </div>

      {/* Designation */}
      <div>
        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
          Designation
        </label>
        <input
          id="designation"
          name="designation"
          type="text"
          placeholder="Enter Designation"
          className="form-control"
          value={formik.values.designation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.designation && formik.touched.designation && (
          <div className="text-danger">{String(formik.errors.designation)}</div>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <ReactQuill
          value={formik.values.description}
          onChange={(value) => formik.setFieldValue('description', value)}
          style={{ height: '200px', marginBottom: '20px' }}
        />
        {formik.errors.description && formik.touched.description && (
          <div className="text-danger">{String(formik.errors.description)}</div>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="mt-4" disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};

export default EditFounder;
