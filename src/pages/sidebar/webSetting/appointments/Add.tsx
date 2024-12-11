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
  useCreateAppointmentsItemMutation,
  useFetchUsersWithRoleQuery,
} from '@/api/appointmentsApi';
import { useFetchMedicalHistoriesQuery } from '@/api/medicalHistoryApi';
import SelectField from '@/components/common/SelectField';
import { useSelector } from 'react-redux';

const Add: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createAppointment] = useCreateAppointmentsItemMutation();
  const { user } = useSelector((state: any) => state.auth);

  const { data: usersWithRole } = useFetchUsersWithRoleQuery({
    roleId: 9,
    perPage: 250,
    page: 1,
  });

  const { data: getPatient } = useFetchUsersWithRoleQuery({
    roleId: 8,
    perPage: 250,
    page: 1,
  });

  const DocOption =
    usersWithRole?.data?.map((doc: any) => ({
      value: doc.id,
      label: doc.name,
    })) || [];

  const PatientOption =
    getPatient?.data?.map((patient: any) => ({
      value: patient.id,
      label: patient.name,
    })) || [];

  const validationSchema = Yup.object().shape({
    date: Yup.string().required('The date field is required.'),
    appointment_type: Yup.string().required(
      'The appointment type field is required.'
    ),
    status: Yup.string().required('The status field is required.'),
    doctor_id: Yup.string().required('The Doctor field is required.'),
    patient_id: Yup.string().required('The Patient field is required.'),
  });

  const handleSubmit = async (values: any, { setErrors }: any) => {
    setLoading(true);
    try {
      await createAppointment(values).unwrap();
      setOpen(false);
      Swal.fire({
        title: 'Success!',
        text: 'Data added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error: any) {
      setErrors(error?.data?.errors || {});
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
            date: '',
            appointment_type: '',
            status: '',
            doctor_id: '',
            patient_id: '',
            created_by: user?.id || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <Field
                    name="date"
                    type="date"
                    className="form-control"
                  />
                  <ErrorMessage name="date" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    as="select"
                    name="appointment_type"
                    className="form-control"
                  >
                    <option value="" label="Select Appointment Type" />
                    <option value="1" label="Approved" />
                    <option value="2" label="Pending" />
                    <option value="3" label="Rejected" />
                  </Field>
                  <ErrorMessage name="appointment_type" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    as="select"
                    name="status"
                    className="form-control"
                  >
                    <option value="" label="Select Status" />
                    <option value="1" label="Active" />
                    <option value="2" label="Inactive" />
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    name="doctor_id"
                    component={SelectField}
                    options={DocOption}
                    placeholder="Select Doctor"
                  />
                  <ErrorMessage name="doctor_id" component="div" className="text-danger" />
                </div>
                <div className="col-md-6 mb-4">
                  <Field
                    name="patient_id"
                    component={SelectField}
                    options={PatientOption}
                    placeholder="Select Patient"
                  />
                  <ErrorMessage name="patient_id" component="div" className="text-danger" />
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
