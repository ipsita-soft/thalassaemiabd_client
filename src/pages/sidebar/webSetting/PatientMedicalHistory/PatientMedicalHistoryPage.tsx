import React, { useState } from "react";
import { useFetchPatientMedicalHistoriesQuery } from "@/api/patientMedicalHistoryApi";
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
import { Spinner } from "@/components/ui/spinner";

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// import Delete from "@/pages/sidebar/webSetting/PatientMedicalHistory/Delete";

import Swal from "sweetalert2";
import ShowPmhDetails from "./ShowPmhDetails";

export function PatientMedicalHistoryPage() {
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error } = useFetchPatientMedicalHistoriesQuery({
        perPage,
        search,
        page: currentPage,
    });

    const [isEditModalOpen, setEditModalOpen] = useState(false);

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
            id: "Patient_name",
            header: "Patient Name",
            cell: ({ row }: { row: { original: any } }) => (
                <div className="text-left">{row.original.patient.name}</div>
            ),
        },


        {
            id: "bts_id",
            header: "BTS ID",
            cell: ({ row }: { row: { original: any } }) => (
                <div className="text-left">{row.original.patient.bts_id}</div>
            ),
        },



        {
            id: "medical-history",
            header: "Medical History",
            cell: ({ row }: { row: { original: any } }) => (
                <div className="text-left">{row.original.medicalHistory.title}</div>
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
                <div className="text-center">{row.original.created_by_user.name}</div>
            ),
        },

        {
            accessorKey: "data",
            header: "Data",
            cell: ({ row }: { row: { original: any } }) => (
                <div className="text-center">


                    <ShowPmhDetails
                        Id={row.original.id.toString()}
                        open={isEditModalOpen}
                        onClose={() => setEditModalOpen(false)}
                    />

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
                            onClick={() =>
                                navigate(`/dashboard/patient-medical-history-update/${data?.id}`, {
                                    state: { from: location.pathname }, // Pass the current route dynamically
                                })
                            }
                        >
                            <Edit className="text-blue-600 w-5 h-5" />
                        </button>



                        {/* <Delete
                            Id={data.id.toString()}
                            onSuccess={handleDeleteSuccess}
                        /> */}


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
    const handleNavigate = () => {
        navigate('/dashboard/admin-patient'); // Replace with your desired route
    };

    return isLoading ? (
        <div className="flex justify-center items-center h-screen">
            <Spinner>Loading...</Spinner>
        </div>
    ) : (
        <div className="p-4">
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

                <Button variant="outline" onClick={handleNavigate}>Add New</Button>



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
