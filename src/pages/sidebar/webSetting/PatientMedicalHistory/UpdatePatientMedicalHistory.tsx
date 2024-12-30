import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchPatientMedicalHistoryQuery, useUpdatePatientMedicalHistoryMutation } from '@/api/patientMedicalHistoryApi';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

interface MedicalHistoryData {
    id: number;
    name: string;
    value: string;
}

export function UpdatePatientMedicalHistory() {
    const { pmhId } = useParams<{ pmhId: string }>();
    const { data: patientHistory, isLoading: loadingPatientHistory, error } = useFetchPatientMedicalHistoryQuery(pmhId || '', {
        skip: !pmhId,
    });

    const [updatePatient] = useUpdatePatientMedicalHistoryMutation();

    const formik = useFormik({
        initialValues: {
            patient_id: '',
            medical_historie_id: '',
            created_by: '',
            data: [] as MedicalHistoryData[],
        },
        validationSchema: Yup.object().shape({
            patient_id: Yup.string().required('Patient ID is required.'),
            medical_historie_id: Yup.string().required('Medical history ID is required.'),
            created_by: Yup.string().required('Created by is required.')
        }),
        onSubmit: async (values, { setErrors }) => {
            try {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: 'Do you want to update the medical history?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Update!',
                    cancelButtonText: 'Cancel',
                });

                if (result.isConfirmed) {
                    await updatePatient({ id: pmhId || '', historyData: values }).unwrap();
                    Swal.fire({
                        title: 'Success!',
                        text: 'Medical history updated successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (err: any) {
                setErrors(err?.data?.data || {});
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update medical history.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        },
    });

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = () => {
        const previousRoute = location.state?.from || '/dashboard/patient-medical-history';
        navigate(previousRoute);
    };


    useEffect(() => {
        if (patientHistory) {
            formik.setValues({
                patient_id: patientHistory.patient?.id || '',
                medical_historie_id: patientHistory.medicalHistory?.id || '',
                created_by: patientHistory.created_by_user?.id || '',
                data: patientHistory.data || [],
            });
        }
    }, [patientHistory]);

    if (loadingPatientHistory) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Spinner className="text-blue-500 w-10 h-10 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center font-semibold text-base mt-8">
                Unable to load medical history. Error: {'Please try again later.'}
            </div>
        );
    }

    // Render the form
    return (
        <div className="p-6 bg-gray-50 min-h-screen">


            <div className="p-6 bg-white shadow-md rounded-lg">



                <div className="flex justify-between items-center mb-6">

                    <p className="text-xl font-semibold text-gray-800 ml-2">Update Patient Medical History </p>

                    <Button variant="outline" onClick={handleNavigate}> {'<<'} Back</Button>



                </div>



                <div className="grid grid-cols-2 gap-6">

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <label className="block text-sm font-medium text-gray-600">Medical History Title</label>
                        <p className="mt-2 text-base font-semibold text-gray-900">
                            {patientHistory?.medicalHistory?.title || '-'}
                        </p>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <label className="block text-sm font-medium text-gray-600">Medical History Date</label>
                        <p className="mt-2 text-base font-semibold text-gray-900">
                            {patientHistory?.date || '-'}
                        </p>
                    </div>


                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <label className="block text-sm font-medium text-gray-600">Patient Name</label>
                        <p className="mt-2 text-base font-semibold text-gray-900">
                            {patientHistory?.patient?.name || '-'}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <label className="block text-sm font-medium text-gray-600">Patient BTS ID</label>
                        <p className="mt-2 text-base font-semibold text-gray-900">
                            {patientHistory?.patient?.bts_id || '-'}
                        </p>
                    </div>

                </div>


                <form
                    onSubmit={formik.handleSubmit}
                    className="mt-3"
                >


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
                                {formik.values.data.map((row, index) => (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-700 text-sm">{index + 1}</td>
                                        <td className="px-4 py-3 text-gray-700 text-sm">{row.name}</td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                name={`data[${index}].value`}
                                                value={row.value || ''}
                                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                                                onChange={(e) =>
                                                    formik.setFieldValue(`data[${index}].value`, e.target.value)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-3">
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white font-medium px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </div>









        </div>
    );
}
