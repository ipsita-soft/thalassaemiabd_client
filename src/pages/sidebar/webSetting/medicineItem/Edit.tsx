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
import { useFetchMedicineItemQuery, useUpdateMedicineItemMutation } from '@/api/medicineItemApi';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

type EditProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Edit: React.FC<EditProps> = ({ Id, onClose }) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    outdoor_rate: 0,
    indoor_rate: 0,
    subsidy: 0,
    sorting_index: 0,
    status: 1,
    medical_history_id: '',
  });

  const { data } = useFetchMedicineItemQuery(Id);
  const [updatemedicineItem, { isLoading: isUpdating }] = useUpdateMedicineItemMutation();

  useEffect(() => {
    if (data?.data) {
      const { name, outdoor_rate, indoor_rate, subsidy, sorting_index, status } = data.data;
      setFormData({
        name: name || '',
        outdoor_rate: outdoor_rate || 0,
        indoor_rate: indoor_rate || 0,
        subsidy: subsidy || 0,
        status: status === 'Active' ? 1 : 2,
        sorting_index: sorting_index || 0,
        medical_history_id: '',
      });
    }
  }, [data]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('The name field is required.'),
    outdoor_rate: Yup.number().nullable(),
    indoor_rate: Yup.number().nullable(),
    subsidy: Yup.number().nullable(),
    sorting_index: Yup.number().required('The sorting index field is required.'),
    status: Yup.number().required('The status field is required.'),
  });

  const handleSubmit = async (values: typeof formData, { setErrors }: any) => {
    try {
      await updatemedicineItem({
        id: Id,
        itemData: values,
      }).unwrap();
      Swal.fire({
        title: 'Success!',
        text: 'Data updated successfully!',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
      });
      setOpen(false);
      onClose();
    } catch (error: any) {
      console.error('Update error:', error);
      setErrors(error?.data?.data || {});
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) onClose();
    }}>
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
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Field
                  as={Input}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  aria-label="Name"
                  className={errors.name && touched.name ? 'border-red-500' : ''}
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sorting_index">Sorting Index</Label>
                <Field
                  as={Input}
                  type="number"
                  id="sorting_index"
                  name="sorting_index"
                  placeholder="Enter Sorting Index"
                  aria-label="Sorting Index"
                  className={errors.sorting_index && touched.sorting_index ? 'border-red-500' : ''}
                />
                <ErrorMessage name="sorting_index" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="outdoor_rate">Outdoor Rate</Label>
                <Field
                  as={Input}
                  type="number"
                  id="outdoor_rate"
                  name="outdoor_rate"
                  placeholder="Enter Outdoor Rate"
                  aria-label="Outdoor Rate"
                  className={errors.outdoor_rate && touched.outdoor_rate ? 'border-red-500' : ''}
                />
                <ErrorMessage name="outdoor_rate" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="indoor_rate">Indoor Rate</Label>
                <Field
                  as={Input}
                  type="number"
                  id="indoor_rate"
                  name="indoor_rate"
                  placeholder="Enter Indoor Rate"
                  aria-label="Indoor Rate"
                  className={errors.indoor_rate && touched.indoor_rate ? 'border-red-500' : ''}
                />
                <ErrorMessage name="indoor_rate" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subsidy">Subsidy</Label>
                <Field
                  as={Input}
                  type="number"
                  id="subsidy"
                  name="subsidy"
                  placeholder="Enter Subsidy"
                  aria-label="Subsidy"
                  className={errors.subsidy && touched.subsidy ? 'border-red-500' : ''}
                />
                <ErrorMessage name="subsidy" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Field
                  as="select"
                  name="status"
                  className="border rounded-md p-2"
                >
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
              </div>

              <DialogFooter className="mt-4 col-span-full">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Submit'}
                </Button>
                <Button
                  type="button"
                  className="ml-2 bg-gray-300 text-gray-800 hover:bg-gray-400"
                  onClick={() => {
                    setOpen(false);
                    onClose();
                  }}
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
