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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMedicalHistoryItemQuery, useUpdateMedicalHistoryItemMutation } from '@/api/medicalHistoryItemApi';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import {
  useFetchMedicalHistoriesQuery,
} from '@/api/medicalHistoryApi'
import SelectField from '@/components/common/SelectField';


type EditProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Edit: React.FC<EditProps> = ({ Id }) => {
  const [open, setOpen] = useState(false);

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




  const [formData, setFormData] = useState({
    title: '',
    status: 1,
    sorting_index: 0,
    medical_history_id: '',
  });

  const { data } = useMedicalHistoryItemQuery(Id);
  const [updateMedicalHistory, { isLoading: isUpdating }] = useUpdateMedicalHistoryItemMutation();

  console.log(data);

  useEffect(() => {
    if (data?.data) {
      const { title, status, sorting_index, medical_history } = data.data;
      setFormData({
        title: title || '',
        status: status === 'Active' ? 1 : 2,
        sorting_index: sorting_index || 0,
        medical_history_id: medical_history.id,
      });
    }
  }, [data]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('The title field is required.'),
    sorting_index: Yup.number().required('The sorting index field is required.'),
    status: Yup.number().required('The status field is required.'),
    medical_history_id: Yup.string().required('The medical history id field is required.'),
  });

  const handleSubmit = async (values: typeof formData, { setErrors }: any) => {
    try {
      await updateMedicalHistory({
        id: Id,
        historyData: values,
      }).unwrap();
      Swal.fire({
        title: 'Success!',
        text: 'Data updated successfully!',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
      });
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
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Field
                  as={Input}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter Title"
                  className={errors.title && touched.title ? 'border-red-500' : ''}
                />
                {errors.title && touched.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sorting_index">Sorting Index</Label>
                <Field
                  as={Input}
                  type="number"
                  id="sorting_index"
                  name="sorting_index"
                  placeholder="Enter Sorting Index"
                  className={errors.sorting_index && touched.sorting_index ? 'border-red-500' : ''}
                />
                <ErrorMessage name="sorting_index" component="div" className="text-danger" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Field as="select" name="status" className="border rounded-md p-2">
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </Field>
                {errors.status && touched.status && (
                  <span className="text-red-500 text-sm">{errors.status}</span>
                )}
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

              <DialogFooter className="mt-4">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Submit'}
                </Button>
                <Button
                  type="button"
                  className="ml-2 bg-gray-300 text-gray-800 hover:bg-gray-400"
                  onClick={() => setOpen(false)}
                >
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
