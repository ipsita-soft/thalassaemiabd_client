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
import { useFetchPatientQuery } from '@/api/patientApi';

export function CratePatientMedicalHistory() {
    const { patient_id, mhId } = useParams();
    const perPage = 250;
    const search = '';
    const currentPage = 1;
    const { data, isLoading, error } = useFetchMedicalHistoriesQuery({ perPage, search, page: currentPage, mhid: mhId });

    const currentDate = new Date();
    const localeDate = currentDate.toLocaleDateString('en-US');
    const [month, day, year] = localeDate.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    const { user } = useSelector((state: any) => state.auth);
    const patientRegistrationData = data?.data || [];
    const [createPatient] = useCreatePatientMedicalHistoryMutation();
    const { data: appointments } = useFetchPatientQuery(patient_id || '');

    const formik = useFormik({
        initialValues: {
            date: formattedDate || '',
            patient_id: patient_id || '',
            created_by: user?.id || '',
            medical_historie_id: mhId || '',
            data: [],
        },
        validationSchema: Yup.object().shape({
            date: Yup.string().required('Date is required'),
            created_by: Yup.string().required('Created By is required')
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
                    await createPatient(values).unwrap();

                    Swal.fire({
                        title: 'Success!',
                        text: 'Data submitted successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });

                    resetForm();
                    window.location.reload();
                }
            } catch (error: any) {
                // console.log(error);
                Swal.fire({
                    title: 'error!',
                    text: error?.data?.data?.patientData,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                setErrors(error?.data?.data || {});
            }
        },
    });

    useEffect(() => {
        if (mhId) {
            formik.setFieldValue('medical_historie_id', mhId);
        }
    }, [mhId]);

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
            <Navbar patient_id={patient_id?.toString() || ''} />
            
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
                            <label htmlFor="date" className="block text-gray-700 font-bold mb-2 text-sm">
                                Patient Name
                            </label>
                            <input
                                type="text"
                                value={appointments?.data?.name + ' >>' + appointments?.data?.bts_id}
                                onChange={formik.handleChange}
                                className="text-capitalize w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition"
                                disabled
                            />
                        </div>

                        <div>
                            <label htmlFor="date" className="block text-gray-700 font-bold mb-2 text-sm">
                                Select Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formik.values.date || formattedDate}
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
                            name="patient_id"
                            value={patient_id}
                            readOnly
                        />
                    </div>

                    <div className="overflow-hidden border border-gray-200 rounded-md shadow-sm">
                        <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-gray-600 font-bold text-sm w-4">S/N</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-bold text-sm">Examinations / Investigations</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-bold text-sm">Value</th>
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
