import { useEffect, useState } from "react";

import { useAppointmentsItemQuery } from '@/api/appointmentsApi';

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
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Delete from "@/pages/sidebar/webSetting/medicalHistory/Delete";

import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";

export default function ShowAppointment() {
  const { appointment_id } = useParams();
  console.log(appointment_id);
  const { data, isLoading, isError: error, refetch } = useAppointmentsItemQuery(appointment_id || '');
  useEffect(() => {
    refetch();
  }, []);
  const patientRegistrationData = data?.data?.patient_medical_history;
  console.log(data?.data);

  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
 
  const columns = [
    {
      id: "serial",
      header: "SL No",
      cell: ({ row }: { row: { index: number } }) => (
        <div className="text-right">{row.index + 1}</div>
      ),
    },
    {
      id: "Date",
      header: "Date",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="text-left">{row.original.date}</div>
      ),
    },

    {
      accessorKey: "medicalHistory",
      header: "MedicalHistory",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="">{row.original.medicalHistory?.title}</div>
      ),
    },
    {
      id: "data",
      header: "Data",
      cell: ({ row }: { row: { original: any } }) => {
        const filteredData = row.original.data.filter((pmhData: any) => pmhData?.value);

        return (
          <div className="text-left space-y-2">
            {filteredData.length > 0 ? (
              filteredData.map((pmhData: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition"
                >

                  <span className="font-medium text-gray-700">
                    {pmhData?.name} :
                  </span>
                  <span className="text-gray-600">
                    {pmhData?.value}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-500  text-center italic">No data available</div>
            )}
          </div>
        );
      },
    },



    {
      id: "actions",
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
              {/* <Edit Id={data.id.toString()} open={false} onClose={() => { }} /> */}
              <br />
              <Link className="mr-2 mt-1 w-40  bg-blue-300 text-white hover:bg-blue-400 transition p-2 text-center rounded font-medium" to={`/dashboard/patient-medical-history-update/${appointment_id}/${data?.id.toString()}/${data?.date}`}>Update History</Link>
              <br />
              <Delete
                Id={data.id.toString()}
                onSuccess={handleDeleteSuccess} // Pass the callback here
              />
            </DropdownMenuContent>
          </DropdownMenu>
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
        pageSize: 100,
        pageIndex: 0,
      },
    },
  });




  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner>Loading...</Spinner>
    </div>
  ) : (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2 text-sm">
            Patient Name
          </label>

          <div className="border p-2 rounded font-medium">
            {data?.data.patient?.name + ' >>' + data?.data.patient?.bts_id}
          </div>
        </div>


        <Button className="bg-white text-black border">
          <Link className=" hover:text-black" to={'/dashboard/appointments'}>
            Back Appointments
          </Link>
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
                  <TableCell className="text-center" colSpan={table.getVisibleLeafColumns().length}>
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



    </div>
  );
}
