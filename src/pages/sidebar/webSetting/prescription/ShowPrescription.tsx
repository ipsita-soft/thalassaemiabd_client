import { useParams } from "react-router-dom";
import { useFetchPrescriptionApiQuery } from "@/api/prescriptionsApi";
import { Spinner } from "@/components/ui/spinner";

function ShowPrescription() {
  const { prescription_id } = useParams();
  console.log(prescription_id);

  const { data: prescription, isLoading } = useFetchPrescriptionApiQuery(prescription_id || '');
  // const showData = prescription.data?.data;
  console.log(prescription?.data);
  // console.log(prescription?.data?.patient?.name);



  return isLoading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div className="bg-white max-w-5xl mx-auto p-8 border rounded-lg  font-sans">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
        <div className="mb-4 lg:mb-0">
          <img
            src="https://backend.thalassaemiasamity.org/storage/settings/headerlogo_1.png"
            alt="Bangladesh Thalassaemia Samity Hospital Logo"
            className="w-32 lg:w-80"
          />
        </div>
        <div className=" lg:text-right">
          <p className="text-sm mt-1">
            Taher Bhaban, Level 3, 5 & 6, 147/1, Green Road (Beside KFC Building),
            Sher-E-Bangla Nagar, Dhaka-1205
          </p>
          <p className="text-sm">
            Contact: +88 02 223135069, +88 01828541519, +88 01944303048
          </p>
          <p className="text-sm">
            Email: <a href="mailto:thalbanga@yahoo.com" className="text-blue-500 underline">thalbanga@yahoo.com</a> | Web:
            <a href="http://www.thalassaemiasamity.org" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              www.thalassaemiasamity.org
            </a>
          </p>
        </div>
      </header>
      <p className="text-lg font-semibold bg-blue-100 text-blue text-center p-1">
        An unique medical service provider in Bangladesh managed by Thalassaemia Patients and Parents only
      </p>

      <hr className="border-t border-gray-300 my-4" />

      {/* Patient Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-6">
        <div className="flex items-center">
          <p className="font-semibold mr-2">Name:</p>
          <p>{prescription?.data?.patient?.name}</p>
        </div>
        <div className="flex items-center">
          <p className="font-semibold mr-2">Age:</p>
          <p>{prescription?.data?.age}</p>
        </div>
        <div className="flex items-center">
          <p className="font-semibold mr-2">Sex:</p>
          <p>{prescription?.data?.patient?.patient_info?.gender?.name}</p>
        </div>
        <div className="flex items-center">
          <p className="font-semibold mr-2">Date:</p>
          <p>{prescription?.data?.date}</p>
        </div>
      </div>


      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left Section */}
        <div className="lg:col-span-4 bg-gray-50 p-4 rounded-lg border">
          <p className="font-semibold mb-3">C/C:</p>
          <p className="mb-4">{prescription?.data?.cc}</p>

          <div className="space-y-2">
            <p><span className="font-semibold">BP:</span> {prescription?.data?.bp}</p>
            <p><span className="font-semibold">Temp:</span> {prescription?.data?.temp}</p>
            <p><span className="font-semibold">Height:</span> {prescription?.data?.height}</p>
            <p><span className="font-semibold">Weight:</span>{prescription?.data?.weight}</p>
            <p><span className="font-semibold">Liver:</span>{prescription?.data?.liver}</p>
            <p><span className="font-semibold">Spleen:</span> {prescription?.data?.spleen}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-8 bg-gray-50 p-4 rounded-lg border">
          <p className="font-semibold mb-3">RX (List of Medicines):</p>
          <ul className="list-decimal list-inside space-y-1">

            {prescription?.data?.medicines.map((value: any) => (
              <li className="text-capitalize mb-2" key={value?.id || value?.name}>

                {value?.medicine.name}
                {" - ( " + value?.timing + " ) "}
                {" - ( " + value?.take_time + " ) -"}
                {value?.duration}


              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Tests Section */}
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <p className="font-semibold mb-2">Advice:</p>
        <ul className="list-disc list-inside space-y-1">

          {prescription?.data?.advice.map((value: any) => (
            <li key={value.id || value.name}>{value?.name}</li>
          ))}

        </ul>
      </div>

      {/* Footer */}
      <footer className="text-right mt-6">
        <p className="font-semibold text-lg">Doctor's Signature</p>
      </footer>
    </div>
  );
}

export default ShowPrescription;
