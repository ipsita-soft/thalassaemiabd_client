import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { update } from '@/redux/slices/userRequestSlice';
import { useToast } from '@/hooks/use-toast';
type ShowData = {
  Id: string;
  open: boolean;
  onClose: () => void;
};



const Show: React.FC<ShowData> = ({ Id }) => {

  const [formData, setFormData] = useState<{
    status: string | null;
  }>({
    status: null,
  });
  console.log(formData);


  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // Track active tab
  const data = useSelector((state: RootState) => state.userRequestData.requests);
  const dataToShow = data.find((data) => data.id.toString() === Id);
  // console.log(dataToShow);

  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();
  if (!dataToShow) {
    return null;
  }

  const renderValue = (value: any) => (value ? value : 'N/A');



  const handleApprovedOrReject = async (status: any) => {
    setFormData((prev) => ({ ...prev, status: status.toString() })); // Update formData with selected status
    const reqData = new FormData();
    reqData.append("status", status.toString());

    try {
      await dispatch(update({ id: Id, data: reqData }));
      toast({
        title: "Success",
        description: "Data updated successfully!",
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to update Data:", error);
      toast({
        title: "Error",
        description: "Failed to update Data. Please try again.",
        variant: "destructive",
      });
    }
  };




  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-blue-300 text-white hover:bg-blue-400 transition">
          Show
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-lg shadow-2xl bg-white p-6 border-2 border-indigo-200"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-300 capitalize border-b pb-2 mb-4">
            {renderValue(dataToShow?.name)}
          </DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-2 px-4 ${activeTab === "profile" ? "text-indigo-500 border-b-2 border-indigo-500" : ""}`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab("role")}
            className={`py-2 px-4 ${activeTab === "role" ? "text-indigo-500 border-b-2 border-indigo-500" : ""}`}
          >
            Role
          </button>

          {renderValue(dataToShow?.role[0]?.name) == 'blood_donor' && (
            <button
              onClick={() => setActiveTab("donorInfo")}
              className={`py-2 px-4 ${activeTab === "donorInfo" ? "text-indigo-500 border-b-2 border-indigo-500" : ""}`}
            >
              Blood Donor Information
            </button>

          )}

          {renderValue(dataToShow?.role[0]?.name) == 'patient' && (
            <button
              onClick={() => setActiveTab("patientInfo")}
              className={`py-2 px-4 ${activeTab === "patientInfo" ? "text-indigo-500 border-b-2 border-indigo-500" : ""}`}
            >
              Patient Info Information
            </button>

          )}


          <button
            onClick={() => setActiveTab("address")}
            className={`py-2 px-4 ${activeTab === "address" ? "text-indigo-500 border-b-2 border-indigo-500" : ""}`}
          >
            Address Information
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6 text-gray-700">
          {activeTab === "profile" && (
            <div>
              <h1 className="text-sm font-semibold text-indigo-300">Profile Information</h1>
              <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-md shadow-sm">
                <div><strong>Phone:</strong> {renderValue(dataToShow?.phone)}</div>
                <div><strong>Email:</strong> {renderValue(dataToShow?.email)}</div>
                <div><strong>Blood Group:</strong>
                  {renderValue(dataToShow?.blood_donor_info?.blood_group?.name)}

                </div>
                <div><strong>Status:</strong> {renderValue(dataToShow?.status)}</div>
                <div><strong>BTS ID:</strong> {renderValue(dataToShow?.bts_id)}</div>
              </div>
            </div>
          )}

          {activeTab === "role" && (
            <div>
              <h4 className="text-lg font-semibold text-indigo-300">Role</h4>
              <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-md shadow-sm">
                <div><strong>Role Name:</strong> {renderValue(dataToShow?.role[0]?.name)}</div>
                <div><strong>Role Guard:</strong> {renderValue(dataToShow?.role[0]?.guard_name)}</div>
              </div>
            </div>
          )}

          {activeTab === "donorInfo" && (
            <div>

              <div className="grid grid-cols-2 gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
                {/* Present Address */}
                <div>
                  {/* <h1 className="text-lg font-semibold text-indigo-400 mb-4">Present Address</h1> */}
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Gender</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.blood_donor_info?.gender?.name)}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Date Of Birth</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.blood_donor_info?.date_of_birth)}</td>
                      </tr>



                      <tr>
                        <th className="pr-4 py-2 text-left text-gray-600">age</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.blood_donor_info?.age)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Permanent Address */}
                <div>
                  {/* <h1 className="text-lg font-semibold text-indigo-400 mb-4">Permanent Address</h1> */}
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Married Status</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.blood_donor_info?.married?.name)}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Occupation</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.blood_donor_info?.occupation)}</td>
                      </tr>

                      <tr>
                        <th className="pr-4 py-2 text-left text-gray-600">Blood Group</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.blood_donor_info?.blood_group?.name)}</td>
                      </tr>


                    </tbody>
                  </table>
                </div>
              </div>


              {/* <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-md shadow-sm">
               <div><strong>Gender:</strong> {renderValue(dataToShow?.patientInfo?.gender?.name)}</div>
               <div><strong>Date of Birth:</strong> {renderValue(dataToShow?.patientInfo?.date_of_birth)}</div>
               <div><strong>Age:</strong> {renderValue(dataToShow?.patientInfo?.age)}</div>
               <div><strong>Marital Status:</strong> {renderValue(dataToShow?.patientInfo?.married?.name)}</div>
               <div><strong>Occupation:</strong> {renderValue(dataToShow?.patientInfo?.occupation)}</div>
             </div> */}
            </div>
          )}




          {activeTab === "patientInfo" && (


            <div>

              <div className="grid grid-cols-2 gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
                {/* Present Address */}
                <div>
                  {/* <h1 className="text-lg font-semibold text-indigo-400 mb-4">Present Address</h1> */}
                  <table className="w-full">
                    <tbody>


                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Disease Type</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.disease_type?.name)}</td>
                      </tr>

                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Height</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.height?.name)}</td>
                      </tr>



                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Gender</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.gender?.name)}</td>
                      </tr>





                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Date Of Birth</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.date_of_birth)}</td>
                      </tr>



                      <tr>
                        <th className="pr-4 py-2 text-left text-gray-600">age</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.age)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Permanent Address */}
                <div>
                  {/* <h1 className="text-lg font-semibold text-indigo-400 mb-4">Permanent Address</h1> */}
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Married Status</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.marital_status?.name)}</td>
                      </tr>

                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Weight</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.weight?.name)}</td>
                      </tr>


                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Occupation</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.occupation)}</td>
                      </tr>

                      <tr>
                        <th className="pr-4 py-2 text-left text-gray-600">Blood Group</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.blood_group?.name)}</td>
                      </tr>


                    </tbody>
                  </table>

                </div>

                <div className='w-60 m-0'>
                  <img src={renderValue(dataToShow?.patientInfo?.electrophoresis_report)} alt='doc' />
                </div>
              </div>



            </div>
          )}


          {activeTab === "address" && (
            <div>
              <div className="grid grid-cols-2 gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
                {/* Present Address */}
                <div>
                  <h1 className="text-lg font-semibold text-indigo-400 mb-4">Present Address</h1>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Country</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.present_address?.country_id.name)}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">City</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.present_address?.city_id.name)}</td>
                      </tr>

                      <tr>
                        <th className="pr-4 py-2 text-left text-gray-600">Post Code</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.present_address?.post_code)}</td>
                      </tr>

                      <tr>
                        <th className="pr-4 py-2 text-left text-gray-600">Address</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.present_address?.address)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Permanent Address */}
                <div>
                  <h1 className="text-lg font-semibold text-indigo-400 mb-4">Permanent Address</h1>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">Country</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.permanent_address?.country_id.name)}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="pr-4 py-2 text-left text-gray-600">City</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.permanent_address?.city_id.name)}</td>
                      </tr>

                      <tr>
                        <th className="pr-4 py-2 text-left text-gray-600">Post Code</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.permanent_address?.post_code)}</td>
                      </tr>

                      <tr>
                        <th className="pr-4 py-2 text-left text-gray-600">Address</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.permanent_address?.address)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        <DialogFooter className="mt-8">
          <div className="grid grid-cols-6 gap-6">


            <div className="col-start-1 col-end-1 flex space-x-4">
              <Button
                onClick={() => handleApprovedOrReject(1)} // Pass status value 1 for "Approved"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 shadow-lg"
              >
                Approved
              </Button>
              <Button
                onClick={() => handleApprovedOrReject(3)} // Pass status value 1 for "Approved"
                className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200 shadow-lg"
              >
                Pending
              </Button>

              <Button
                onClick={() => handleApprovedOrReject(4)} // Pass status value 4 for "Rejected"
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 shadow-lg"
              >
                Rejected
              </Button>
            </div>


            <div className="col-end-7 col-span-2 flex justify-end">
              <Button
                onClick={() => setOpen(false)}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200 shadow-lg"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogFooter>



      </DialogContent>
    </Dialog>
  );
};

export default Show;
