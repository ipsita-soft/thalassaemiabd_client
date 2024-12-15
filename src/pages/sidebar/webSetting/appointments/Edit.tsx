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
import { useAppointmentsItemQuery, useFetchUsersWithRoleQuery, useUpdateAppointmentsItemMutation } from '@/api/appointmentsApi';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import SelectField from '@/components/common/SelectField';  // Assuming you have a SelectField component for dropdowns


type EditProps = {
  Id: string;
};

const Edit: React.FC<EditProps> = ({ Id }) => {
  const [open, setOpen] = useState(false); // Manage modal state internally



  const { user } = useSelector((state: any) => state.auth);


  const { data: usersWithRole } = useFetchUsersWithRoleQuery({
    roleId: 9,
    perPage: 250,
    page: 1,
    all: 'all',
  });

  const { data: getPatient } = useFetchUsersWithRoleQuery({
    roleId: 8,
    perPage: 250,
    page: 1,
    all: 'all',
  });

  const DocOption =
    usersWithRole?.data?.map((doc: any) => ({
      value: doc.id,
      label: doc.name,
    })) || [];

  const PatientOption =
    getPatient?.data?.map((patient: any) => ({
      value: patient.id,
      label: patient.name + ' ' + patient.bts_id,
    })) || [];

  const [formData, setFormData] = useState({
    date: '',
    appointment_type: '',
    status: '',
    doctor_id: '',
    patient_id: '',
    created_by: user?.id || '',
  });

  const { data: appointments } = useAppointmentsItemQuery(Id);
  const [updateMedicalAppontment, { isLoading: isUpdating }] = useUpdateAppointmentsItemMutation();

  useEffect(() => {
    if (appointments?.data) {
      const { date, appointment_type, status, doctor, patient } = appointments.data;

      const statusMapping: { [key: string]: string } = {
        Approved: '1',
        Pending: '2',
        Rejected: '3',
      };

      const appointmentMapping: Record<string, string> = {
        'Doctor Appointment': '1',
        'Blood Request': '2',
        'Bed Booking': '3',
      };

      setFormData({
        date: date || '',
        appointment_type: appointmentMapping[appointment_type as keyof typeof appointmentMapping] || '',
        status: statusMapping[status] || '',
        doctor_id: doctor?.id,
        patient_id: patient?.id,
        created_by: user?.id,
      });
    }
  }, [appointments, user]);


  console.log('asdf', appointments?.data.patient.id)

  const validationSchema = Yup.object().shape({
    date: Yup.string().required('The date field is required.'),
    appointment_type: Yup.string().required('The appointment type field is required.'),
    status: Yup.string().required('The status field is required.'),
    doctor_id: Yup.string().required('The doctor field is required.'),
    patient_id: Yup.string().required('The patient field is required.'),
  });

  const handleSubmit = async (values: typeof formData, { setErrors }: any) => {
    try {
      const formattedValues = {
        ...values,
        status: Number(values.status),
        appointment_type: Number(values.appointment_type),
      };
      await updateMedicalAppontment({
        id: Id,
        historyData: formattedValues,
      }).unwrap();
      Swal.fire({
        title: 'Success!',
        text: 'Data updated successfully!',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
      });
      setOpen(false); // Close the modal after successful update
    } catch (error: any) {
      setErrors(error?.data?.data || {});
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="mr-2 mt-1 w-40 bg-slate-300 text-white hover:bg-slate-400 transition"
          onClick={() => setOpen(true)} // Open the modal when the button is clicked
        >
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
              {/* Date Input */}

              <div className='row'>
                <div className="col-md-6 mb-4">
                  <Label htmlFor="date">Date</Label>
                  <Field
                    as={Input}
                    type="date"
                    id="date"
                    name="date"
                    className={errors.date && touched.date ? 'border-red-500' : ''}
                  />
                  <ErrorMessage name="date" component="span" className="text-red-500 text-sm" />
                </div>

                <div className="col-md-6 mb-4">
                  <Label htmlFor="appointment_type">Appointment Type</Label>
                  <Field
                    as="select"
                    name="appointment_type"
                    className="form-control"
                    id="appointment_type"
                  >
                    <option value="">Select Appointment Type</option>
                    <option value="1" label="Doctor Appointment" />
                    <option value="2" label="Blood Request" />
                    <option value="3" label="Bed Booking" />
                  </Field>
                  <ErrorMessage name="appointment_type" component="span" className="text-red-500 text-sm" />
                </div>

                <div className="col-md-6 mb-4">
                  <Label htmlFor="status">Status</Label>
                  <Field
                    as="select"
                    name="status"
                    className="form-control"
                    id="status"
                  >
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="span" className="text-red-500 text-sm" />
                </div>


                {/* Doctor Dropdown */}
                <div className="col-md-6 mb-4">
                  <Label htmlFor="doctor_id">Doctor</Label>

                  <Field
                    as={SelectField}
                    id="doctor_id"
                    name="doctor_id"
                    options={DocOption}
                    component={SelectField}
                    defaultValue={formData.doctor_id}
                    placeholder="Select Doctor"
                  />
                  <ErrorMessage name="doctor_id" component="span" className="text-red-500 text-sm" />
                </div>

                {/* Patient Dropdown */}
                <div className="col-md-6 mb-4">
                  <Label htmlFor="patient_id">Patient</Label>

                  <Field
                    as={SelectField}
                    id="patient_id"
                    name="patient_id"
                    options={PatientOption}
                    component={SelectField}
                    defaultValue={formData.patient_id}
                    placeholder="Select Doctor"
                  />
                  <ErrorMessage name="patient_id" component="span" className="text-red-500 text-sm" />
                </div>
              </div>


              <DialogFooter className="mt-4">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Submit'}
                </Button>
                <Button
                  type="button"
                  className="ml-2 bg-gray-300 text-gray-800 hover:bg-gray-400"
                  onClick={() => setOpen(false)} // Close the modal when Cancel is clicked
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
