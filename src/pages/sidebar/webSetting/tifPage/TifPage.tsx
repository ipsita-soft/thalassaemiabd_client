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
import { MoreHorizontal, Youtube } from "lucide-react";
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
import { get } from "@/redux/slices/pagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import Navbar from "./Navbar";
import TruncatedDescription from "./TruncatedDescription";


interface Data {
    id: string;
    title?: string;
    image?: string;
    description?: string;
    videolink?: string;
    type?: string;
    status: "Active" | "Inactive";
}




export function TifPage() {
    const dispatch: AppDispatch = useDispatch();
    const { tifPages, meta, isLoading, isError, error } = useSelector(
        (state: RootState) => state.pages
    );

    console.log(tifPages);

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
                <div className="text-right">{row.index + 1}</div>
            ),
        },

        {
            id: "title",
            header: "Title",
            cell: ({ row }: { row: { original: Data } }) => (
                <div className="text-left">{row.original.title}</div>
            ),
        },

        {
            id: "image",
            header: "Image",
            cell: ({ row }: { row: { original: Data } }) => (
                row.original.type !== 'video' ? (
                    <img
                        src={row.original.image}
                        alt="Image"
                        className="w-16 h-16 object-cover"
                    />
                ) : (
                    <span>No Image (Type is Video)</span> // Optional text when it's a video
                )
            ),
        },

        {
            id: "Video",
            header: "video Url",
            cell: ({ row }: { row: { original: Data } }) => (
                <a href={row.original.videolink} target="_blank" rel="noopener noreferrer" className="text-left">
                    <Youtube />
                </a>
            ),
        },


        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }: { row: { original: Data } }) => (
                <div className="text-center">{row.original.type}</div>
            ),
        },


        {
            id: "description",
            header: "Description",
            cell: ({ row }: { row: { original: Data } }) => (
                <TruncatedDescription description={row.original.description} />

            ),
        },


        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }: { row: { original: Data } }) => {
                const page = row.original;

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

                                Id={page.id.toString()}
                                open={isEditModalOpen}
                                onClose={() => setEditModalOpen(false)}
                            />

                            <br />





                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: tifPages as unknown as Data[],
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

                <div className="mb-4">
                    <Navbar />

                </div>

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
