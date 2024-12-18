import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchMedicalHistoriesQuery } from '@/api/medicalHistoryItemApi';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { useCreatePatientMedicalHistoryMutation } from '@/api/patientMedicalHistoryApi';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useAppointmentsItemQuery } from '@/api/appointmentsApi';

export function UpdatePatientMedicalHistory() {
    const { apId, mhId, apDate } = useParams();
    const perPage = 250;
    const search = '';
    const currentPage = 1;
    const { data, isLoading, error } = useFetchMedicalHistoriesQuery({ perPage, search, page: currentPage, mhid: mhId });

    const { user } = useSelector((state: any) => state.auth);
    const patientRegistrationData = data?.data || [];
    const [createPatient] = useCreatePatientMedicalHistoryMutation();

    const { data: appointments } = useAppointmentsItemQuery(apId || '');

    useEffect(() => {
        if (mhId) {
            formik.setFieldValue('medical_historie_id', mhId); // Update formik field
        }
    }, [mhId]);

    const formik = useFormik({
        initialValues: {
            date: apDate || '',
            created_by: user?.id || '',
            medical_historie_id: mhId || '',
            appointment_id: apId || '',
            data: [],
        },
        validationSchema: Yup.object().shape({
            date: Yup.string().required('Date is required'),
            created_by: Yup.string().required('Created By is required'),
            // medical_historie_id: Yup.string().required('Medical History ID is required'),
            appointment_id: Yup.string().required('Appointment ID is required'),
        }),
        onSubmit: async (values: any, { setErrors, resetForm }) => {
            try {
                const result = await Swal.fire({
                    title: 'Please Recheck Your Data',
                    text: 'Do you want to submit the data?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Submit!',
                    cancelButtonText: 'Cancel',
                });

                if (result.isConfirmed) {
                    await createPatient(values).unwrap(); // Submit the form data
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data submitted successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });

                    resetForm();
                  
                }
            } catch (error: any) {
                setErrors(error?.data?.data || {});
            }
        },

    });

    useEffect(() => {
        if (patientRegistrationData.length > 0) {
            formik.setFieldValue(
                'data',
                patientRegistrationData.map((item, index) => ({
                    id: item.id || index + 1,
                    name: item.title || `Item ${index + 1}`,
                    value: item.value || '',
                }))
            );
        }
    }, [patientRegistrationData]);

    return isLoading ? (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <Spinner className="text-blue-500 w-10 h-10 animate-spin" />
        </div>
    ) : (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Navbar />
            {error ? (
                <div className="text-red-500 text-center font-semibold text-base mt-8">
                    Unable to load data. Please try again later.
                </div>
            ) : (
                <form
                    onSubmit={formik.handleSubmit}
                    className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto mt-10 space-y-6 border border-gray-200"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label htmlFor="date" className="block text-gray-700 font-medium mb-2 text-sm">
                                Patient Name
                            </label>
                            <input
                                type="text"
                                value={appointments?.data?.patient?.name + ' >>' + appointments?.data?.patient?.bts_id}
                                onChange={formik.handleChange}
                                className="text-capitalize w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition"

                                disabled
                            />
                        </div>

                        <div>

                            <label htmlFor="date" className="block text-gray-700 font-medium mb-2 text-sm">
                                Select Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition"
                            />
                        </div>

                        <input
                            type="hidden"
                            name="medical_historie_id"
                            value={formik.values.medical_historie_id}
                            onChange={formik.handleChange}
                        />

                        <input
                            type="hidden"
                            name="appointment_id"
                            value={apId}
                            readOnly
                        />
                    </div>
                    <div className="overflow-hidden border border-gray-200 rounded-md shadow-sm">
                        <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-gray-600 font-medium text-sm">SL No</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-medium text-sm">Name</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-medium text-sm">Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {formik.values.data.map((row: any, index: any) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-700 text-sm">{index + 1}</td>
                                        <td className="px-4 py-3 text-gray-700 text-sm">{row.name}</td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                name={`data[${index}].value`}
                                                value={formik.values.data[index]?.value || ''}
                                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                                                onChange={(e) =>
                                                    formik.setFieldValue(
                                                        `data[${index}].value`,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white font-medium px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );



}