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
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';
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
import Edit from "./Edit";
import Show from "./Show";
import { get } from "@/redux/slices/rolesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Add from "./Add";




interface Data {
    id: number;
    name: string;

    image: string;
    sorting_index: number;
    title: string;
    description: string;
    date: string;
    status: "Active" | "Inactive";
}

export function RolesPage() {
    const dispatch: AppDispatch = useDispatch();
    const { roles, meta, isLoading, isError, error } = useSelector(
        (state: RootState) => state.rolesData
    );

    const [showSliderDetails, setShowSliderDetails] = useState(false);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [filterValue, setFilterValue] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(meta?.current_page || 1);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        const params = {
            per_page: perPage,
            page: currentPage,
        };
        dispatch(get(params));


    }, [dispatch, perPage, currentPage]);

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
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }: { row: { original: Data } }) => {
                const role = row.original;
                console.log('inner data', role)

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
                            <Edit

                                Id={role.id.toString()}
                                open={isEditModalOpen}
                                onClose={() => setEditModalOpen(false)}
                            />
                            <br />
                            <Show
                                Id={role.id.toString()}
                                open={showSliderDetails}
                                onClose={() => setShowSliderDetails(false)}
                            />
                            <br />

                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: roles as unknown as Data[],
        columns,
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
    });

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
        setColumnFilters([{ id: "status", value: event.target.value }]);
    };

    const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(parseInt(event.target.value, 10));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (

        isLoading ? (
            <div className="flex justify-center items-center h-screen">
                <Spinner >Loading...</Spinner>
            </div>
        ) :

            <div className="p-4">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
                    <Input
                        type="text"
                        placeholder="Filter by Status"
                        value={filterValue}
                        onChange={handleFilterChange}
                        className="w-full lg:w-64"
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
                    <Add />
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
                                className={`mr-1 ${link.active ? 'underline bg-slate-400' : ''
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
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
