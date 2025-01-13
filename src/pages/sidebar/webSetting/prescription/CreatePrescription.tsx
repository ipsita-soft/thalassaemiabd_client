import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { calculateAge } from '@/utils/dateUtils';
import { useFetchPatientQuery } from "@/api/patientApi";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchPublicLabTestServiceItem, fetchPublicMedicineItems } from "@/redux/slices/publicSlice";
import { useCreatePrescriptionsApiMutation } from "@/api/prescriptionsApi";
import Swal from "sweetalert2";

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

const CreatePrescription = () => {
    const { patient_id } = useParams();
    const { data: patient, isLoading } = useFetchPatientQuery(patient_id || '');
    const getAge = calculateAge(patient?.data?.patientInfo?.date_of_birth);
    const dispatch = useDispatch<AppDispatch>();

    const [createPrescription] = useCreatePrescriptionsApiMutation();
    const { labTestServiceItems, medicineItems, isLoading: commonDataLoading } = useSelector((state: RootState) => state.public);
    useEffect(() => {
        dispatch(fetchPublicLabTestServiceItem({ getAll: 'all' }));
        dispatch(fetchPublicMedicineItems({ getAll: 'all' }));
    }, [dispatch]);


    const [form, setForm] = useState<FormData>({
        date: new Date().toISOString().split("T")[0],
        patient_id: patient_id || null,
        age: null,
        cc: "",
        bp: "",
        temp: "",
        height: "",
        weight: "",
        liver: "",
        spleen: "",
    });


    useEffect(() => {
        if (patient?.data?.patientInfo?.date_of_birth) {
            const getAge = calculateAge(patient.data.patientInfo.date_of_birth);
            setForm((prevForm) => ({
                ...prevForm,
                age: getAge,
            }));
        }
    }, [patient]);


    const [medicines, setMedicines] = useState<any>([
        { medicine_item_id: null, timing: "", take_time: "", duration: "" },
    ]);

    const tests = labTestServiceItems?.data?.map((data: any) => ({
        id: data?.id,
        name: data?.name,
    }));

    const tests2 = medicineItems?.data?.map((data: any) => ({
        id: data?.id,
        name: data?.name,
    }));

    const [selectedTests, setSelectedTests] = useState<number[]>([]);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleMedicineChange = (
        index: number,
        field: null | string,
        value: string | number | null
    ) => {
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




        const payload: any = {
            ...form,
            advice: selectedTests.map((testId) =>
                labTestServiceItems?.data?.find((test: any) => test.id === testId)
            ),
            medicines,
        };

        console.log(payload);

        try {
            await createPrescription(payload).unwrap();
            Swal.fire({
                title: "Success!",
                text: "Prescription created successfully!",
                icon: "success",
            });
            window.location.reload();

        } catch (error: any) {
            Swal.fire({
                title: "Error",
                text: error?.data?.message || "Something went wrong.",
                icon: "error",
            });
        }
    };

    return isLoading && commonDataLoading ? (
        <Spinner />
    ) : (
        <div className="max-w-7xl p-5 pt-4 rounded border">

            <h1 className="text-2xl font-bold mb-6 text-center border p-2 mt-3">
                Prescription Information
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                <div>

                    <label className="block text-sm mb-1 font-medium">Name:</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        value={patient?.data?.name + ' ( ' + patient?.data?.bts_id + ' )' || ""}
                        disabled
                    />

                    <input
                        className="border p-2 rounded w-full"
                        type="hidden"
                        value={patient_id || ""}
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

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm mb-1  font-medium">Disease type:</label>
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
                        value={getAge}
                        disabled
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
                <div className="lg:col-span-3">



                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">C/C:</label>
                        <textarea
                            className="border p-2 rounded w-full h-24"
                            placeholder="Type.."
                            value={form.cc}
                            onChange={(e) => handleInputChange("cc", e.target.value)}
                        />
                    </div>



                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">BP:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            value={form.bp}
                            onChange={(e) => handleInputChange("bp", e.target.value)}
                        />
                    </div>

                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Temp:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            value={form.temp}
                            onChange={(e) => handleInputChange("temp", e.target.value)}
                        />
                    </div>


                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Height:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            value={form.height}
                            onChange={(e) => handleInputChange("height", e.target.value)}
                        />
                    </div>


                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Weight:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            value={form.weight}
                            onChange={(e) => handleInputChange("weight", e.target.value)}
                        />
                    </div>

                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Liver:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            value={form.liver}
                            onChange={(e) => handleInputChange("liver", e.target.value)}
                        />
                    </div>



                    <div className="mb-1">
                        <label className="block text-sm mb-1 font-medium">Spleen:</label>
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            value={form.spleen}
                            onChange={(e) => handleInputChange("spleen", e.target.value)}
                        />
                    </div>



                </div>

                <div className="lg:col-span-9">
                    {/* RX Section */}
                    <div className="mb-6">
                        <label className="block text-sm mb-1 font-medium">RX (Medicines):</label>
                        {medicines.map((medicine: any, index: any) => (
                            <div key={index} className="flex flex-wrap gap-2 mb-2 items-center">
                                <div className="flex-grow" style={{ flexBasis: "45%" }}>
                                    <Select
                                        className="border w-full"
                                        options={tests2.map((test) => ({
                                            value: test.id,
                                            label: test.name,
                                        }))}
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

                    {/* Advice Section */}
                    <div className="mb-6">
                        <label className="block text-sm mb-1 font-medium">Advice:</label>
                        <Select
                            isMulti
                            className="w-full"
                            options={tests.map((test) => ({
                                value: test.id,
                                label: test.name,
                            }))}
                            onChange={(options) =>
                                setSelectedTests(options.map((option) => option.value))
                            }
                        />
                    </div>
                </div>
            </div>


            <div className="text-center">

                <Button onClick={handleSubmit}>

                    Submit Prescription

                </Button>
            </div>
        </div>
    );
};

export default CreatePrescription;
