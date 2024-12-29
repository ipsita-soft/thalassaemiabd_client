
import ShowNavbar from './ShowNavbar';
import { Link, useParams } from 'react-router-dom';
import { useFetchPatientQuery } from '@/api/patientApi';
import { useFetchPatientMedicalHistoriesQuery } from "@/api/patientMedicalHistoryApi";
import { Spinner } from '@/components/ui/spinner';

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
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Delete from "@/pages/sidebar/webSetting/PatientMedicalHistory/Delete";

import Swal from "sweetalert2";
import { useState } from 'react';



export function PatientAllHistory() {
  const { patient_id, mhId } = useParams();
  const { data: appointments } = useFetchPatientQuery(patient_id || '');



  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useFetchPatientMedicalHistoriesQuery({
    perPage,
    search,
    page: currentPage,
    patientId: patient_id,
    medicalHistorieId: mhId,
  });



  const meta = data?.meta;
  const patientRegistrationData = data?.data;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filterValue, setFilterValue] = useState("");
  const columns = [
    {
      id: "serial",
      header: "SL No",
      cell: ({ row }: { row: { index: number } }) => (
        <div className="">{row.index + 1}</div>
      ),
    },








    {
      id: "date",
      header: "Date",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="text-left">{row.original.date}</div>
      ),
    },



    {
      accessorKey: "created_by_user",
      header: "Created By",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="text-left">{row.original.created_by_user.name}</div>
      ),
    },

    {
      accessorKey: "data",
      header: "Data",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="text-left">

          <div className="max-h-96 overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100">

            {console.log(row.original.data)}
            {row.original.data?.length > 0 ? (
              row.original.data.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-2 mb-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-shadow shadow-sm"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {item.name}:
                  </span>
                  <span className="text-sm text-gray-600">{item.value}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm">
                No data available.
              </p>
            )}
          </div>
          {/* <ShowPmhDetails
            Id={row.original.id.toString()} */}
          {/* // open={isEditModalOpen}
          // onClose={() => setEditModalOpen(false)} */}
          {/* /> */}

        </div>
      ),
    },


    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }: { row: { original: any } }) => {
        const data = row.original;

        const handleDeleteSuccess = () => {

          Swal.fire({
            title: 'success!',
            text: 'Data deleted successfully!',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
          });

        };

        return (

          <div className="flex items-center gap-2">

            <button
              title="Edit"
              className={`flex items-center justify-center rounded-full 
      p-0 w-8 h-8 bg-transparent border border-gray-300 
      hover:bg-gray-100 hover:border-gray-400 transition-all 
      focus:ring-2 focus:ring-gray-300 disabled:opacity-50`}

              onClick={() => navigate(`/dashboard/patient-medical-history-update/${data?.id}`)}
            >
              <Edit className="text-blue-600 w-5 h-5" />
            </button>


            <Delete
              Id={data.id.toString()}
              onSuccess={handleDeleteSuccess}
            />


          </div>
        );
      },
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
    setSearch(value);
    setFilterValue(value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(event.target.value, 10));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();





  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner>Loading...</Spinner>
    </div>
  ) : (
    <div className="p-4">
      <ShowNavbar patient_id={patient_id?.toString() || ''} />
      <div className='mb-4'>
        <label htmlFor="date" className="block mt-3 text-gray-700 font-bold mb-2 text-sm">
          Patient Name
        </label>
        <input
          type="text"
          value={appointments?.data?.name + ' >>' + appointments?.data?.bts_id}
          className="text-capitalize font-bold w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition"
          disabled
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
        <Input
          type="text"
          placeholder="Search"
          value={filterValue}
          onChange={handleFilterChange}
          className="w-full lg:w-64"
        />
        <div className="flex items-center">
          <label className="text-slate-500" htmlFor="perPage">
            Per Page:
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={handlePerPageChange}
            className="ml-2 p-2 rounded"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>


        <Button variant="outline" asChild>
          <Link to={`/dashboard/patient-medical-history/${patient_id}/${mhId}`}> Add New</Link>
        </Button>



      </div>
      {error ? (
        <>Error</>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={table.getVisibleLeafColumns().length}>
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {meta?.from} to {meta?.to} of {meta?.total} entries
        </div>
        <div className="flex space-x-2">
          {meta?.links.map((link, index) => (
            <Button
              key={index}
              onClick={() => {
                console.log("Link URL:", link.url);
                if (link.url) {
                  const page = new URL(link.url).searchParams.get("page");
                  console.log("Page Number:", page);
                  handlePageChange(Number(page));
                }
              }}
              disabled={!link.url}
              className={`${link.active
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-black hover:bg-gray-300"
                }`}

            >
              {link.label
                .replace(/&laquo;/g, '<<')
                .replace(/&raquo;/g, '>>')
                .trim()
              }
            </Button>
          ))}
        </div>
      </div>



    </div>
  );


}
