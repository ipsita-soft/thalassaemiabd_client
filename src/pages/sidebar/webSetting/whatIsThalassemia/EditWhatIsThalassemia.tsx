import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFetchWhatIsThalassemiaQuery, useUpdateWhatIsThalassemiaMutation } from '@/api/WhatIsThalassemiaApi';

type EditWhatIsThalassemiaProps = {
  Id: string;
};

const EditWhatIsThalassemia: React.FC<EditWhatIsThalassemiaProps> = ({ Id }) => {
  const { toast } = useToast();
  const { data: apiResponse, isLoading } = useFetchWhatIsThalassemiaQuery(Id);
  const [updateWhatIsThalassemia, { isLoading: isUpdating }] = useUpdateWhatIsThalassemiaMutation();

  const data = apiResponse?.data;

  useEffect(() => {
    console.log('Thalassemia data:', data);
  }, [data]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.title || '',
      video: data?.video || '',
      description: data?.description || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      video: Yup.string().url('Invalid URL').required('YouTube video URL is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      try {
        await updateWhatIsThalassemia({ id: Id, data: values }).unwrap();
        toast({
          title: 'Success',
          description: 'What is Thalassemia updated successfully!',
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

      {/* YouTube Video URL */}
      <div>
        <label htmlFor="video" className="block text-sm font-medium text-gray-700">
          YouTube Video URL
        </label>
        <input
          id="video"
          name="video"
          type="url"
          placeholder="YouTube Video URL"
          className="form-control"
          value={formik.values.video}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.video && formik.touched.video && (
          <div className="text-danger">{String(formik.errors.video)}</div>
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
      <Button type="submit" className='mt-4' disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};

export default EditWhatIsThalassemia;
