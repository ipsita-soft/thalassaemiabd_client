
import ShowNavbar from './ShowNavbar';
import { useLocation, useParams } from 'react-router-dom';
import { useFetchPatientQuery } from '@/api/patientApi';
import { useFetchPatientMedicalHistoriesQuery, useFetchPatientMedicalHistoriesByDateQuery } from "@/api/patientMedicalHistoryApi";
import { Spinner } from '@/components/ui/spinner';
import Select from 'react-select';
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Edit, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from 'react';



export function PatientAllHistory() {
  const { patient_id, mhId } = useParams();
  const { data: adminPatient } = useFetchPatientQuery(patient_id || '');

  console.log(adminPatient?.data?.profile_image);

  const location = useLocation();

  const handleEditClick = (id: string) => {

    navigate(`/dashboard/patient-medical-history-update/${id}`, {
      state: { from: location.pathname },
    });

  };

  const handleCreateClick = (patient_id: any, mhid: any) => {
    navigate(`/dashboard/patient-medical-history/${patient_id}/${mhid}`, {
      state: { from: location.pathname },
    });
    console.log(location.pathname)

  };



  const perPage = 1;
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // setPerPage(1);

  const { data, isLoading, error } = useFetchPatientMedicalHistoriesQuery({
    perPage: perPage,
    search,
    page: currentPage,
    patientId: patient_id,
    medicalHistorieId: mhId,
  });





  const currentPage2 = 1;


  const { data: pmhDataData, isLoading: isOptionLoading, refetch } = useFetchPatientMedicalHistoriesByDateQuery({
    perPage: 'all',
    page: currentPage2,
    patientId: patient_id,
    medicalHistorieId: mhId,
  });


  const options = pmhDataData?.data?.map((patientHisData) => ({
    value: patientHisData?.date,
    label: patientHisData?.date,
  }));

  useEffect(() => {
    // setSearch('');
    // setFilterValue('');
    refetch();
  }, [mhId]);

  const patientRegistrationData = data?.data;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filterValue, setFilterValue] = useState("");
  const columns = [
    {
      accessorKey: "data",
      header: " Examinations / Investigations",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="p-4 bg-white shadow-md rounded-md">

          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4  rounded-md">
            <div className="md:w-2/3">
              <div className="text-xl font-bold text-gray-900">{row.original.date}</div>
              <div className="text-sm text-gray-500 mt-2">
                <span className="font-medium text-indigo-600">Created By:</span> {row.original.created_by_user.name}
              </div>
            </div>
            <div>
              <button
                title="Edit"
                className={`flex items-center justify-center rounded-full 
    p-0 w-8 h-8 bg-transparent border border-gray-300 
    hover:bg-gray-100 hover:border-gray-400 transition-all 
    focus:ring-2 focus:ring-gray-300 disabled:opacity-50`}
                onClick={() => handleEditClick(row.original?.id)} // Use an anonymous function
              >
                <Edit className="text-blue-600 w-5 h-5" />
              </button>

            </div>
          </div>




          {/* Data Table */}
          <div className="mt-6">
            {row.original.data?.length > 0 ? (
              <table className="min-w-full border border-gray-200 rounded-md overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {row.original.data.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-indigo-50 transition`}
                    >
                      <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-400 text-sm mt-2">No data available.</p>
            )}
          </div>
        </div>
      ),
      style: { flex: 9 }, // 90% for "Data"
    },
  ];




  const table = useReactTable({
    data: patientRegistrationData || [],
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: perPage,
        pageIndex: 0,
      },
    },
  });


  const handleFilterChange = (value: string) => {
    setSearch(value);
    setFilterValue(value);
    setCurrentPage(1);
  };


  const navigate = useNavigate();





  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner>Loading...</Spinner>
    </div>
  ) : (
    <div className="">
      <ShowNavbar patient_id={patient_id?.toString() || ''} />

      <div className="flex flex-col md:flex-row gap-4 mt-3">
        {/* Left Section */}
        <div className="md:w-1/3 bg-white p-4 shadow-md rounded-md">
          <label
            htmlFor="date"
            className="block mt-3 text-gray-700 font-bold mb-3 text-sm"
          >
            Patient Name
          </label>

          <input
            type="text"
            value={adminPatient?.data?.name + ' >> ' + adminPatient?.data?.bts_id}
            className="capitalize font-bold w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition"
            disabled
          />



          {isOptionLoading ? (
            <p>Loading options...</p>
          ) : (
            <Select
              value={options?.find((option) => option.value === filterValue)}
              onChange={(selectedOption) => {
                if (selectedOption && typeof selectedOption.value === 'string') {
                  handleFilterChange(selectedOption.value);
                } else {
                  console.warn('Selected value is not a string:', selectedOption?.value);
                }
              }}
              options={options}
              className="mt-3 w-full"
              placeholder="Choose a date"
            />
          )}


          <button
            onClick={() => handleCreateClick(patient_id, mhId)}
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Patient Medical History  <span className='ml-2 text-sm mt-1v text-blue-500 p-1'><PlusCircle /> </span>
          </button>



          <div className="mt-3 max-w-3xl mx-auto  overflow-hidden">
            <div className="bg-gradient-to-r text-white p-5 flex flex-col items-center">
              <img
                src={adminPatient?.data?.profile_image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
              />
              <h3 className="text-lg font-semibold mt-3">{adminPatient?.data?.name || "Patient Name"}</h3>
              <p className="text-sm opacity-75">{adminPatient?.data?.email || "Email not available"}</p>
            </div>

            <div className="">
              <table className="w-full text-sm text-left text-gray-700">
                <thead>
                  <tr className="bg-gray-100 text-gray-900">
                    <th className="px-4 py-2">Old BTS ID</th>
                    <th className="px-4 py-2">{adminPatient?.data?.patientInfo?.old_bts_id || "N/A"}</th>
                  </tr>
                </thead>
                <tbody>
                 
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-medium">Phone</td>
                    <td className="px-4 py-2">{adminPatient?.data?.phone || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Disease Type</td>
                    <td className="px-4 py-2">{adminPatient?.data?.patientInfo?.disease_type?.name || "N/A"}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-medium">Height</td>
                    <td className="px-4 py-2">{adminPatient?.data?.height?.name || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Gender</td>
                    <td className="px-4 py-2">{adminPatient?.data?.patientInfo?.gender?.name || "N/A"}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-medium">Date of Birth</td>
                    <td className="px-4 py-2">{adminPatient?.data?.patientInfo?.date_of_birth || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>



        </div>

        {/* Right Section */}
        <div className="md:w-2/3 bg-white p-4 shadow-md rounded-md">
          {error ? (
            <div className="text-red-500">Error</div>
          ) : (
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-3 text-left text-xs text-gray-700 font-bold uppercase tracking-wider"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={table.getVisibleLeafColumns().length}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-100">
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </div>
  );


}
