import React, { useState } from "react";
import { useFetchAppointmentsQuery } from "@/api/appointmentsApi";
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
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Add from "@/pages/sidebar/webSetting/appointments/Add";
import Edit from "@/pages/sidebar/webSetting/medicalHistoryItem/Edit";
import Show from "@/pages/sidebar/webSetting/medicalHistoryItem/Show";
import Delete from "@/pages/sidebar/webSetting/medicalHistoryItem/Delete";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { DialogTrigger } from "@/components/ui/dialog";

export function AppointmentsPage() {
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error } = useFetchAppointmentsQuery({
        perPage,
        search,
        page: currentPage,
    });

    console.log(data);



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
                <div className="text-right">{row.index + 1}</div>
            ),
        },


        {
            id: "doctor",
            header: "Doctor",
            cell: ({ row }: { row: { original: any } }) => (
                <div className="text-left">{row.original.doctor?.name}</div>
            ),
        },
        {
            id: "patient",
            header: "Patient",
            cell: ({ row }: { row: { original: any } }) => (
                <div className="text-left">{row.original.patient?.name}</div>
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
            id: "status",
            header: "Status",
            cell: ({ row }: { row: { original: any } }) => (
                <div className="text-left">{row.original.status}</div>
            ),
        },


        {
            id: "appointment_type",
            header: "Appointment Type",
            cell: ({ row }: { row: { original: any } }) => (
                <div className="text-left">{row.original.appointment_type}</div>
            ),
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

                            <Link className="mr-2 mt-1 w-40  bg-blue-300 text-white hover:bg-blue-400 transition p-2 text-center rounded" to={`/dashboard/patient-medical-history/${data.id.toString()}`}>Add History</Link>
                            <br />


                            <Edit Id={data.id.toString()} open={false} onClose={() => { }} />
                            <br />
                            <Show Id={data.id.toString()} open={false} onClose={() => { }} />

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
                <Add />
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
