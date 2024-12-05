import React, { useEffect, useState } from "react";
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import Show from "./Show";
import { get } from "@/redux/slices/userRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

interface Data {
    id: number;
    name: string;
    profile_image: string;
    phone: string;
    email: string;
    status: string;
    role: any;
}

export function RequestPage() {
    const dispatch: AppDispatch = useDispatch();

    const location = useLocation();
    const { requests, meta, isLoading, isError, error } = useSelector(
        (state: RootState) => state.userRequestData
    );

    const [showSliderDetails, setShowSliderDetails] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(meta?.current_page || 1);



    useEffect(() => {
        const routeName = location.pathname; // Get the current route name (path)
        console.log("Current Route:", routeName);

        const params = {
            per_page: perPage,
            page: currentPage,
            status:
                routeName === '/dashboard/patients' ? 1 :
                routeName === '/dashboard/user-request' ? 2 :
                    routeName === '/dashboard/user-pending' ? 3 :
                        routeName === '/dashboard/user-rejected' ? 4 :
                            4
        };

        dispatch(get(params));
    }, [dispatch, perPage, currentPage, location.pathname]); // Add location.pathname to dependencies


    const columns = [
        {
            id: "serial",
            header: "SL No",
            cell: ({ row }: { row: { index: number } }) => (
                <div>{row.index + 1}</div>
            ),
        },
        {
            id: "name",
            header: "Name",
            cell: ({ row }: { row: { original: Data } }) => (
                <div className="text-left">{row.original.name}</div>
            ),
        },
        {
            id: "phone",
            header: "Phone",
            cell: ({ row }: { row: { original: Data } }) => (
                <div className="text-left">{row.original.phone}</div>
            ),
        },
        {
            id: "status",
            header: "Status",
            cell: ({ row }: { row: { original: Data } }) => (
                <div className="text-left">{row.original.status}</div>
            ),
        },
        {
            id: "roleName",
            header: "Role Name",
            cell: ({ row }: { row: { original: Data } }) => (
                <div className="text-left">
                    {row.original?.role.map((rol: any) => rol.name).join(", ")}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }: { row: { original: Data } }) => {
                const role = row.original;
                return (
                    <Show
                        Id={role.id.toString()}
                        open={showSliderDetails}
                        onClose={() => setShowSliderDetails(false)}
                    />
                );
            },
        },
    ];

    const table = useReactTable({
        data: requests as unknown as Data[],
        columns,
        pageCount: Math.ceil(requests.length / perPage),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        initialState: {
            pagination: {
                pageSize: perPage,
                pageIndex: 0,
            }
        }

    });


    const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(event.target.value, 10);
        table.setPageSize(newSize);
        setPerPage(newSize);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        isLoading ? (
            <div className="flex justify-center items-center h-screen">
                <Spinner>Loading...</Spinner>
            </div>
        ) : (
            <div className="p-4">



                <div className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0 lg:space-x-4">

                    <Input
                        placeholder="Filter id..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm "
                    />

                    <div className="flex items-center">
                        <label className="text-slate-500" htmlFor="perPage">Per Page :</label>
                        <select
                            id="perPage"
                            value={perPage}
                            onChange={handlePerPageChange}
                            className="ml-2 p-2 rounded"
                        >
                            <option value={10}>10</option>
                            <option value={100}>100</option>
                            <option value={250}>250</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <Navbar />

                </div>

                {isError ? (
                    <>Error: {error && <p>Error: {error.message}</p>}</>
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
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.length === 0 ? (
                                    <TableRow>
                                        <TableCell className="text-center" colSpan={table.getVisibleLeafColumns().length}>
                                            Data Not Found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
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
                    <div className="font-medium">
                        Showing {meta?.from} to {meta?.to} of {meta?.total} entries
                    </div>
                    <div className="flex-right">
                        {meta?.links.map((link) => (
                            <Button
                                key={link.label}
                                onClick={() => {
                                    if (link.url) {
                                        const page = new URL(link.url).searchParams.get("page");
                                        handlePageChange(Number(page));
                                    }
                                }}
                                disabled={!link.url}
                                className={`mr-1 ${link.active ? 'underline bg-slate-400' : ''} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {link.label.replace(/&laquo;/g, '<<').replace(/&raquo;/g, '>>').trim()}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
}
