import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { update } from '@/redux/slices/userRequestSlice';
import { useToast } from '@/hooks/use-toast';
import { useFetchPatientQuery, useFetchPatientsQuery } from '@/api/patientApi';
import Swal from 'sweetalert2';
import { Eye, Facebook, Mail, MapPin, Phone } from "lucide-react";

import React from 'react';
import QRCode from 'react-qr-code';


type ShowData = {
  Id: string;
  open: boolean;
  onClose: () => void;
};



const Show: React.FC<ShowData> = ({ Id }) => {


  const { refetch } = useFetchPatientsQuery({
    perPage: 10,
    page: 1,
    search: '',
  });


  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // Track active tab

  const { data, isLoading, isError } = useFetchPatientQuery(Id);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  if (isLoading) {
    return '';
  }

  if (isError || !data?.data) {
    return <p>Error loading data. Please try again later.</p>;
  }


  const handlePrint = () => {
    const printContent = document.getElementById("printable-area");

    if (printContent) {
      const newWindow = window.open("", "_blank");

      if (newWindow) {
        const styles = `
          <style>
            body {
              font-family: 'Roboto', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #fafafa;
              color: #333;
              line-height: 1.6;
            }
            h1, h2, h3 {
              color: #1a73e8;
              font-weight: 600;
            }
            h1 { font-size: 30px; }
            h2 { font-size: 24px; }
            h3 { font-size: 18px; }
            p { font-size: 16px; margin-bottom: 15px; }
            .section {
              margin: 20px auto;
              padding: 20px;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              max-width: 900px;
            }
            .section-header {
              font-size: 22px;
              font-weight: 500;
              margin-bottom: 10px;
              text-transform: uppercase;
              border-bottom: 2px solid #1a73e8;
              padding-bottom: 10px;
            }
            .img-profile {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              object-fit: cover;
              margin-bottom: 20px;
              border: 3px solid #1a73e8;
            }
            .flex-row {
              display: flex;
              justify-content: space-between;
              gap: 20px;
            }
            .flex-column {
              flex: 1;
              padding-right: 20px;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .table th, .table td {
              padding: 12px;
              border: 1px solid #ddd;
              text-align: left;
            }
            .table th {
              background-color: #f4f4f4;
              font-weight: bold;
            }
            .table tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #1a73e8;
              color: white;
              font-size: 16px;
              border-radius: 5px;
              text-decoration: none;
              text-align: center;
              transition: background-color 0.3s;
            }
            .btn:hover {
              background-color: #1558b0;
            }
            .print-header-center {
              text-align: center !important;
             margin-bottom: 20px;
            }

            footer.print-header-center {
              text-align: center;
              padding: 20px;
              margin-top: 30px;
              background-color: #c1c1c1;
              color: white;
              font-size: 14px;
              border-top: 2px solid #f4f4f4;
            }

            footer.print-header-center p {
              margin: 0;
              font-weight: bold;
            }

            footer.print-header-center a {
              color: white;
              text-decoration: none;
              font-weight: normal;
              border-bottom: 1px solid white;
              transition: border-bottom 0.3s;
            }

            footer.print-header-center a:hover {
              border-bottom: 1px solid #f4f4f4;
            }
          </style>
        `;

        const renderValue = (value: any) => value ? value : 'N/A';

        newWindow.document.write(`
          <html>
            <head>
              <title>Print Patient Information</title>
              ${styles}
            </head>
            <body>
             
  
              <div class="section">

                <header class="print-header-center">
                  <h1>Patient Information</h1>
                  <p>Detailed profile and medical information</p>
                </header>


                <h2 class="section-header">Profile Information</h2>
                <div class="flex-row">
                   <div class="flex-column">
                    <p><strong>Name:</strong> ${renderValue(dataToShow?.name)}</p>
                    <p><strong>Phone:</strong> ${renderValue(dataToShow?.phone)}</p>
                    <p><strong>BTS ID:</strong> ${renderValue(dataToShow?.bts_id)}</p>
                  </div>
                  
                  <div class="flex-column">
                    <p><strong>Email:</strong> ${renderValue(dataToShow?.email)}</p>
                    <p><strong>Blood Group:</strong> ${renderValue(dataToShow?.patientInfo?.blood_group?.name)}</p>
                    <p><strong>Old BTS ID:</strong> ${renderValue(dataToShow?.patientInfo?.old_bts_id)}</p>
                  </div>
               
                 * 
                  <div class="flex-column">

                    <img src="${renderValue(dataToShow?.profile_image)}" alt="Profile" class="img-profile" />
                  </div>


                </div>
              </div>
  
              <div class="section">
                <h2 class="section-header">Patient Details</h2>
                <table class="table">
                  <tbody>
                    <tr><th>Disease Type:</th><td>${renderValue(dataToShow?.patientInfo?.disease_type?.name)}</td></tr>
                    <tr><th>Height:</th><td>${renderValue(dataToShow?.patientInfo?.height?.name)}</td></tr>
                    <tr><th>Gender:</th><td>${renderValue(dataToShow?.patientInfo?.gender?.name)}</td></tr>
                    <tr><th>Date of Birth:</th><td>${renderValue(dataToShow?.patientInfo?.date_of_birth)}</td></tr>
                    <tr><th>Age:</th><td>${renderValue(dataToShow?.patientInfo?.age)}</td></tr>
                    <tr><th>Marital Status:</th><td>${renderValue(dataToShow?.patientInfo?.marital_status?.name)}</td></tr>
                    <tr><th>Weight:</th><td>${renderValue(dataToShow?.patientInfo?.weight?.name)}</td></tr>
                    <tr><th>Occupation:</th><td>${renderValue(dataToShow?.patientInfo?.occupation)}</td></tr>
                    <tr><th>Blood Group:</th>
                    <td>
                      ${renderValue(dataToShow?.patientInfo?.blood_group?.name)}
                    </td></tr>
                  </tbody>
                </table>
              </div>
  
              <footer class="print-header-center">
                <p>
                  © 2024 Thalassaemia Samity. All Rights Reserved. 
                  <br />
                  Developed by <a href="http://www.ipsitacomputers.com" target="_blank">IPSITA COMPUTERS PTE LTD</a>
                </p>
              </footer>
            </body>
          </html>
        `);

        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
        newWindow.close();
      } else {
        toast({
          title: "Error",
          description: "Unable to print. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Unable to find content to print.",
        variant: "destructive",
      });
    }
  };



  const dataToShow = data.data;

  const renderValue = (value: any) => (value ? value : 'N/A');

  const handleApprovedOrReject = async (status: any) => {
    const reqData = new FormData();
    reqData.append("status", status.toString());

    try {
      await dispatch(update({ id: Id, data: reqData }));

      Swal.fire({
        title: 'Success!',
        text: 'Data updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000,
      });

      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Failed to update Data:", error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to update data. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 3000,
      });

    }
  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          title='Show Patient'
          className={`flex items-center justify-center rounded-full 
          p-0 w-8 h-8 bg-transparent border border-blue-300 
          hover:bg-blue-100 hover:border-blue-400 transition-all 
          focus:ring-2 focus:ring-blue-300 disabled:opacity-50`}>
          <Eye className="w-5 h-5 text-blue-600" />

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
            Basic Information
          </button>



          <button
            onClick={() => setActiveTab("patientInfo")}
            className={`py-2 px-4 ${activeTab === "patientInfo" ? "text-indigo-500 border-b-2 border-indigo-500" : ""}`}
          >
            Patient Profile
          </button>

          <button
            onClick={() => setActiveTab("address")}
            className={`py-2 px-4 ${activeTab === "address" ? "text-indigo-500 border-b-2 border-indigo-500" : ""}`}
          >
            Address
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6 text-gray-700">

          {activeTab === "profile" && (


            <div>
              <h1 className="text-sm font-semibold text-indigo-300">Profile Information</h1>

              <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-md shadow-sm">

                <div>
                  <strong className='mb-2'>Phone:</strong> {renderValue(dataToShow?.phone)} <br /><br />

                  <strong className='mb-2'>Email:</strong> {renderValue(dataToShow?.email)} <br /><br />
                  <strong className='mb-2'>Blood Group: </strong>
                  {renderValue(dataToShow["patientInfo"]?.["blood_group"]?.["name"])}

                </div>

                <div>
                  <strong className='mb-2'>Status:</strong> {renderValue(dataToShow?.status)}<br /><br />
                  <strong className='mb-2'>BTS ID:</strong> {renderValue(dataToShow?.bts_id)}<br /><br />
                  <strong className='mb-2'>Old BTS ID:</strong>

                  {renderValue(dataToShow["patientInfo"]?.["old_bts_id"])}

                  {/* {renderValue(dataToShow?.old_bts_id)} */}
                </div>

                <div >
                  <img
                    className="w-36 h-36 rounded-full border object-cover"
                    src={renderValue(dataToShow?.profile_image)}
                    alt="Profile"
                  />
                </div>

              </div>


              <div className=''>
                <div className="flex items-center mb-4">
                  <h1 className="text-lg font-semibold md:text-2xl mt-3">ID Card</h1>
                </div>
                <div className="flex flex-row items-center gap-6">
                  {/* Front Side of the ID Card */}
                  <div className="w-[85mm] h-[54mm] border-3 border-red-600 rounded-md shadow-md relative overflow-hidden">
                    {/* Top Red Corner Design */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: "15%",
                        width: "60%",
                        backgroundColor: "rgb(220 38 38)",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        height: "90%",
                        width: "9%",
                        backgroundColor: "rgb(220 38 38)",
                        clipPath: "polygon(0 0, 100% 15%, 100% 100%, 0 100%)",
                      }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-3">
                      {/* Logo and Header */}
                      <div className="flex items-center mb-3 ms-4 mt-3">
                        <img
                          src="../client/assets/images/idcardlogo.png"
                          alt="Logo"
                          style={{ height: "70px", width: "70px", marginTop: "-17px" }}
                          className="object-contain"
                        />
                        <div className="ml-2">
                          <h2 className="text-[14px] font-bold text-green-800">
                            Bangladesh Thalassaemia Samity Hospital
                          </h2>
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div className="text-center">
                        <p className="text-sm text-capitalize font-bold text-red-600">
                          {renderValue(dataToShow?.name)}
                        </p>
                        <p className="text-sm font-bold text-black">
                          Blood Group: {renderValue(dataToShow?.patientInfo?.blood_group?.name)}
                        </p>
                        <p className="text-sm font-bold  text-black text-green-800">
                          ID: {renderValue(dataToShow?.bts_id)}
                          <br />
                          Old-Id:
                          {renderValue(dataToShow["patientInfo"]?.old_bts_id)}
                        </p>
                        <p className="text-sm font-bold text-red-600">
                          {renderValue(dataToShow?.patientInfo?.disease_type?.name)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back Side of the ID Card */}
                  <div className="w-[85mm] h-[54mm] border-3 border-red-600 rounded-md shadow-md relative">
                    {/* Background white */}
                    <div className="absolute inset-0 bg-white"></div>

                    <div className="relative z-10 flex flex-col h-full p-3">
                      {/* QR Code and Signature */}
                      <div className="flex justify-between">
                        <div className="flex justify-center items-center">
                          <QRCode style={{ height: "100px", width: "100px" }} value={
                            'Name : ' + renderValue(dataToShow?.name) + ', ' +
                            'Phone : ' + renderValue(dataToShow?.phone) + ', ' +
                            'Father-Name : ' + renderValue(dataToShow?.patientInfo?.father_name) + ', ' +
                            'Mother-Name : ' + renderValue(dataToShow?.patientInfo?.mother_name) + ', ' +
                            'City: ' + renderValue(dataToShow?.patientInfo?.permanent_address?.city_id?.name)
                          } />
                        </div>
                        <div className="mt-4 ms-5 text-center">
                          <img
                            src="../client/assets/images/singature.png"
                            style={{ height: "30px", width: "120px" }}
                            alt="Signature"
                          />
                          <p className="text-xs font-medium">Authorized Signature</p>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="mt-2 text-center">
                        <p className="text-[12px] font-bold mb-2 leading-none">
                          Bangladesh Thalassaemia Samity & Hospital
                        </p>
                        <p className="text-[9px] mb-1 leading-none flex justify-center items-center">
                          <MapPin className="w-3 h-3 mr-1" /> Taher Bhaban, 121/1A,
                          Level 3 & 5, Green Road, Dhaka-1215
                        </p>
                        <p className="text-[9px] mb-1 leading-none flex justify-center items-center">
                          <Phone className="w-3 h-3 mr-1" /> Tel: 02-223356005 | 0185815651,
                          01834560489
                        </p>
                        <p className="text-[9px] leading-none flex justify-center items-center">
                          <Facebook className="w-3 h-3 mr-0" /> FB: fb/thalassamy
                          <Mail className="w-3 h-3 ms-2 mr-1" /> Email:
                          info@thalassaemiasamity.org
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

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


                      <tr>
                        <th className="pr-4 py-2 text-left text-gray-600">Number Of Children</th>
                        <td className="py-2 text-gray-800 font-medium">: {renderValue(dataToShow?.patientInfo?.number_of_children)}</td>
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



                <div className='mt-3'>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <table className="w-full text-sm bg-gray-50 p-4 rounded-lg">
                      <tbody>
                        <tr><th className="text-left py-2">Father Name:</th><td>{renderValue(dataToShow?.patientInfo?.father_name)}</td></tr>
                        <tr><th className="text-left py-2">Mother Name:</th><td>{renderValue(dataToShow?.patientInfo?.mother_name)}</td></tr>
                        <tr><th className="text-left py-2">Husband Name:</th><td>{renderValue(dataToShow?.patientInfo?.husband_name)}</td></tr>
                        <tr><th className="text-left py-2">Wife Name:</th><td>{renderValue(dataToShow?.patientInfo?.wife_name)}</td></tr>
                        <tr><th className="text-left py-2">Emergency Contact:</th><td>{renderValue(dataToShow?.patientInfo?.emergency_contact_number)}</td></tr>


                      </tbody>
                    </table>
                    <table className="w-full text-sm bg-gray-50 p-4 rounded-lg">
                      <tbody>
                        <tr><th className="text-left py-2">Father Occupation:</th><td>{renderValue(dataToShow?.patientInfo?.father_occupation)}</td></tr>
                        <tr><th className="text-left py-2">Father Income Status:</th><td>{renderValue(dataToShow?.patientInfo?.father_income_status)}</td></tr>
                        <tr><th className="text-left py-2">Number of Siblings:</th><td>{renderValue(dataToShow?.patientInfo?.number_of_siblings)}</td></tr>
                        <tr><th className="text-left py-2">Siblings Status:</th><td>{renderValue(dataToShow?.patientInfo?.siblings_status)}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className='w-100'>
                  {dataToShow?.patientInfo?.electrophoresis_report ? (
                    // Check if it's a PDF
                    dataToShow.patientInfo.electrophoresis_report.includes('.pdf') ? (
                      <embed
                        src={dataToShow.patientInfo.electrophoresis_report}
                        type="application/pdf"
                        width="100%"
                        height="500px"
                      // alt="Electrophoresis Report"
                      />
                    ) : dataToShow.patientInfo.electrophoresis_report.match(/\.(jpeg|jpg|gif|png)$/) ? (
                      // Check if it's an image (JPEG, PNG, GIF)
                      <img
                        src={dataToShow.patientInfo.electrophoresis_report}
                        alt="Electrophoresis Report"
                        className="w-full h-auto"
                      />
                    ) : (
                      // For DOC or other files, show a download link
                      <a
                        href={dataToShow.patientInfo.electrophoresis_report}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View Electrophoresis Report
                      </a>
                    )
                  ) : (
                    <p>No report available</p>
                  )}
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










        <div id="printable-area">

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

              <Button onClick={handlePrint} className="bg-green-500 text-white hover:bg-green-600 transition mr-3">
                Print
              </Button>


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
