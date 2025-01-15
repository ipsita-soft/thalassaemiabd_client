import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { calculateAge } from '@/utils/dateUtils';
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchPublicLabTestServiceItem, fetchPublicMedicineItems } from "@/redux/slices/publicSlice";
import { useFetchPrescriptionApiQuery, useUpdatePrescriptionsApiMutation } from "@/api/prescriptionsApi";
import Swal from "sweetalert2";
import { useFetchPatientQuery } from "@/api/patientApi";
import { ArrowBigLeft, SkipBackIcon, StepBack } from "lucide-react";

interface FormData {
    date: string;
    patient_id: string | null;
    age: string | null;
    cc: string;
    bp: string;
    temp: string;
    height: string;
    weight: string;
    liver: string;
    spleen: string;
}

const UpdatePrescription = () => {
    const { prescription_id } = useParams();
    const { data: prescription, isLoading: prescriptionLoading } = useFetchPrescriptionApiQuery(prescription_id || '');
    const { data: patient, isLoading: getPatientLoading } = useFetchPatientQuery(prescription?.data?.patient?.id || '');
    const dispatch = useDispatch<AppDispatch>();


    const [updatePrescription] = useUpdatePrescriptionsApiMutation();
    const { labTestServiceItems, medicineItems, isLoading: commonDataLoading } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        dispatch(fetchPublicLabTestServiceItem({ getAll: 'all' }));
        dispatch(fetchPublicMedicineItems({ getAll: 'all' }));
    }, [dispatch]);


    const tests2 = labTestServiceItems?.data?.map((data: any) => ({
        id: data?.id,
        name: data?.name,
    }));
    const medicineItem = medicineItems?.data?.map((data: any) => ({
        id: data?.id,
        name: data?.name,
    }));

    const [selectedTests, setSelectedTests] = useState<number[]>([]);




    const [form, setForm] = useState<FormData>({
        date: '',
        patient_id: prescription?.data?.patient?.id || null,
        age: null,
        cc: '',
        bp: '',
        temp: '',
        height: '',
        weight: '',
        liver: '',
        spleen: '',
    });

    useEffect(() => {
        if (prescription?.data) {
            setForm({
                date: prescription?.data?.date,
                patient_id: prescription?.data?.patient?.id,
                age: calculateAge(patient?.data?.patientInfo?.date_of_birth),
                cc: prescription?.data?.cc,
                bp: prescription?.data?.bp,
                temp: prescription?.data?.temp,
                height: prescription?.data?.height,
                weight: prescription?.data?.weight,
                liver: prescription?.data?.liver,
                spleen: prescription?.data?.spleen,
            });
        }
    }, [prescription, patient]);

    const navigate = useNavigate();

    const backtoPrescription = () => {
        navigate("/dashboard/prescriptions");
    };

    const [medicines, setMedicines] = useState<any>(prescription?.data?.medicines || [{ medicine_item_id: null, timing: "", take_time: "", duration: "" }]);


    useEffect(() => {
        if (prescription?.data?.medicines) {
            const defaultMedicines = prescription.data.medicines.map((med: any) => ({
                medicine_item_id: med.medicine.id,
                timing: med.timing,
                take_time: med.take_time,
                duration: med.duration,
            }));
            setMedicines(defaultMedicines);
        }
    }, [prescription, medicineItems]);


    useEffect(() => {
        if (prescription?.data?.advice) {
            const initialTests = prescription.data.advice.map((advice: any) => advice.id);
            setSelectedTests(initialTests);
        }
    }, [prescription]);


    const handleInputChange = (field: keyof FormData, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleMedicineChange = (index: number, field: null | string, value: string | number | null) => {
        const updatedMedicines = [...medicines];
        if (field != null) {
            updatedMedicines[index][field] = value;
        }
        setMedicines(updatedMedicines);
    };

    const addMedicine = () => {
        setMedicines([
            ...medicines,
            { medicine_item_id: null, timing: "", take_time: "", duration: "" },
        ]);
    };

    const removeMedicine = (index: number) => {
        const updatedMedicines = medicines.filter((_: any, i: number) => i !== index);
        setMedicines(updatedMedicines);
    };

    const handleSubmit = async () => {
        if (!form.patient_id || !form.cc || medicines.some((m: any) => !m.medicine_item_id)) {
            Swal.fire({
                title: "Error",
                text: "Please fill all required fields.",
                icon: "error",
            });
            return;
        }

        const advice = selectedTests.map((testId) =>
            labTestServiceItems?.data?.find((test: any) => test.id === testId)
        );

        const payload: any = {
            ...form,
            medicines: JSON.stringify(medicines),
            advice: JSON.stringify(advice),
            _method: 'PUT',
        };

        try {
            await updatePrescription({ id: prescription_id, data: payload }).unwrap();
            Swal.fire({
                title: "Success!",
                text: "Prescription updated successfully!",
                icon: "success",
            });
        } catch (error: any) {
            Swal.fire({
                title: "Error",
                text: error?.data?.message || "Something went wrong.",
                icon: "error",
            });
        }
    };



    return prescriptionLoading || getPatientLoading || commonDataLoading ? (
        <Spinner />
    ) : (
        <div className="max-w-7xl p-5 pt-4 rounded border">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mb-6 bg-white p-6 rounded-lg shadow-md border">
                
                <h1 className="text-1xl   text-lg text-left">

                    <span className="border-b-2 pb-1">
                    # Update Prescription
                    </span>
                </h1>

                <div className="flex justify-center sm:justify-end text-1xl ">
                    <Button onClick={backtoPrescription} className="text-1xl" variant={"outline"}>  <ArrowBigLeft></ArrowBigLeft> Back</Button>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm mb-1 font-medium">Name:</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        value={patient?.data?.name + ' ( ' + patient?.data?.bts_id + ' )' || ""}
                        disabled
                    />


                </div>
                <div>
                    <label className="block text-sm mb-1 font-medium">Date:</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="date"
                        value={form.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm mb-1 font-medium">Disease type:</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        value={patient?.data?.patientInfo?.disease_type?.name}
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1 font-medium">Sex:</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        value={patient?.data?.patientInfo?.gender?.name}
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1 font-medium">Age:</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        value={form.age || ''}
                        disabled
                    />
                </div>
            </div>

            {/* Form Inputs for Prescription Details (CC, BP, etc.) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
                <div className="lg:col-span-3">
                    {/* CC, BP, Temp, etc. */}
                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">C/C:</label>
                        <textarea
                            className="border p-2 rounded w-full h-24"
                            placeholder="Type.."
                            value={form.cc}
                            onChange={(e) => handleInputChange("cc", e.target.value)}
                        />
                    </div>

                    {/* BP */}
                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Blood Pressure:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            placeholder="Enter BP"
                            value={form.bp}
                            onChange={(e) => handleInputChange("bp", e.target.value)}
                        />
                    </div>

                    {/* Temp */}
                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Temperature:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            placeholder="Enter Temp"
                            value={form.temp}
                            onChange={(e) => handleInputChange("temp", e.target.value)}
                        />
                    </div>

                    {/* Height */}
                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Height:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            placeholder="Enter Height"
                            value={form.height}
                            onChange={(e) => handleInputChange("height", e.target.value)}
                        />
                    </div>

                    {/* Weight */}
                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Weight:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            placeholder="Enter Weight"
                            value={form.weight}
                            onChange={(e) => handleInputChange("weight", e.target.value)}
                        />
                    </div>

                    {/* Liver */}
                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Liver:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            placeholder="Enter Liver Condition"
                            value={form.liver}
                            onChange={(e) => handleInputChange("liver", e.target.value)}
                        />
                    </div>

                    {/* Spleen */}
                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Spleen:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            placeholder="Enter Spleen Condition"
                            value={form.spleen}
                            onChange={(e) => handleInputChange("spleen", e.target.value)}
                        />
                    </div>




                </div>

                <div className="lg:col-span-9">
                    {/* RX Section (Medicines) */}
                    <div className="mb-6">
                        <label className="block text-sm mb-1 font-medium">RX (Medicines):</label>
                        {medicines.map((medicine: any, index: any) => (
                            <div key={index} className="flex flex-wrap gap-2 mb-2 items-center">
                                <div className="flex-grow" style={{ flexBasis: "45%" }}>
                                    <Select
                                        className="border w-full"
                                        options={medicineItem.map((test) => ({
                                            value: test.id,
                                            label: test.name,
                                        }))}

                                        value={
                                            medicine.id
                                                ? { value: medicine.id, label: medicine.name }
                                                : medicine.medicine_item_id
                                                    ? {
                                                        value: medicine.medicine_item_id,
                                                        label:
                                                            medicineItem.find(
                                                                (item) => item.id === medicine.medicine_item_id
                                                            )?.name || '',
                                                    }
                                                    : null
                                        }



                                        placeholder="Select Medicine"
                                        onChange={(option) =>
                                            handleMedicineChange(
                                                index,
                                                "medicine_item_id",
                                                option?.value || null
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex-grow" style={{ flexBasis: "15%" }}>
                                    <input
                                        className="border p-2 rounded w-full"
                                        type="text"
                                        placeholder="Timing"
                                        value={medicine.timing || ""}
                                        onChange={(e) =>
                                            handleMedicineChange(index, "timing", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex-grow" style={{ flexBasis: "15%" }}>
                                    <input
                                        className="border p-2 rounded w-full"
                                        type="text"
                                        placeholder="Take Time"
                                        value={medicine.take_time || ""}
                                        onChange={(e) =>
                                            handleMedicineChange(index, "take_time", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex-grow" style={{ flexBasis: "15%" }}>
                                    <input
                                        className="border p-2 rounded w-full"
                                        type="text"
                                        placeholder="Duration"
                                        value={medicine.duration || ""}
                                        onChange={(e) =>
                                            handleMedicineChange(index, "duration", e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white p-2 rounded"
                                    onClick={() => removeMedicine(index)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mx-auto"
                                        fill="none"
                                        viewBox="0 0 23 22"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                        ))}
                        <button
                            className="mt-2 bg-gray-700 text-white py-2 px-4 rounded"
                            onClick={addMedicine}
                        >
                            Add Medicine
                        </button>
                    </div>


                    {/* Advice Section (Lab Tests) */}
                    <div className="mb-6">
                        <label className="block text-sm mb-1 font-medium">Advice (Lab Tests):</label>
                        <Select
                            isMulti
                            options={tests2?.map((test: any) => ({
                                value: test.id,
                                label: test.name,
                            }))}
                            value={selectedTests.map((testId) => {
                                const matchedTest = tests2?.find((test: any) => test.id === testId);
                                return matchedTest ? { value: matchedTest.id, label: matchedTest.name } : null;
                            })}
                            onChange={(selectedOptions) => {
                                setSelectedTests(selectedOptions.map((option: any) => option.value));
                            }}
                            placeholder="Select Advice"
                        />

                        {/* <Select
                            isMulti
                            options={tests2}
                            value={tests2?.filter((test: any) => selectedTests.includes(test.id))}
                            onChange={(selectedOptions) =>
                                setSelectedTests(selectedOptions.map((option: any) => option.id))
                            }
                        /> */}

                    </div>

                    <Button onClick={handleSubmit}>Update Prescription</Button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePrescription;
