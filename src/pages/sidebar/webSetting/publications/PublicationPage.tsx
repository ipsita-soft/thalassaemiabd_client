"use client";

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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import NewBlogNewsModal from "./NewBlogNewsModal";
import EditModal from "./EditModal";
import Show from "./Show";
import Delete from "./Delete";
import { get } from "@/redux/slices/publicationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useToast } from '@/hooks/use-toast';


interface Publication {
    id: number;
    image: string;
    sorting_index: number;
    title: string;
    description: string;
    status: "Active" | "Inactive";
}

export function PublicationPage() {
    const dispatch: AppDispatch = useDispatch();
    const { publications, meta, isLoading, isError, error } = useSelector(
        (state: RootState) => state.publications
    );


    const [showSliderDetails, setShowSliderDetails] = useState(false);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [filterValue, setFilterValue] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(meta?.current_page || 1);

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
            cell: ({ row }: { row: { original: Publication } }) => (
                <p>
                    {row.original.title}
                </p>
            ),
        },


        {
            id: "image",
            header: "Image",
            cell: ({ row }: { row: { original: Publication } }) => (
                <img
                    src={row.original.image}
                    alt="Publication"
                    className="w-16 h-16 object-cover"
                />
            ),
        },
        {
            accessorKey: "sorting_index",
            header: ({ column }: { column: any }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Sorting Index
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }: { row: { original: Publication } }) => (
                <div className="text-center">{row.original.sorting_index}</div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }: { row: { original: Publication } }) => (
                <div className="text-center">{row.original.status}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }: { row: { original: Publication } }) => {
                const publication = row.original;
                const [isEditModalOpen, setEditModalOpen] = useState(false);
                const { toast } = useToast();

                const handleDeleteSuccess = () => {
                    toast({
                        title: 'Success',
                        description: 'Blog News deleted successfully!',
                    });
                    dispatch(get({})); // Dispatch here
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

                            <EditModal

                                BlogNewsId={publication.id.toString()}
                                open={isEditModalOpen}
                                onClose={() => setEditModalOpen(false)}
                            />
                            <br />
                            <Show

                                Id={publication.id.toString()
                                }
                                open={showSliderDetails}
                                onClose={() => setShowSliderDetails(false)}
                            />
                            <br />

                            <Delete
                                id={publication.id.toString()}
                                onSuccess={handleDeleteSuccess} // Pass the callback here
                            />



                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: publications as unknown as Publication[],
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
                <NewBlogNewsModal />
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <>Error: {error && <p>Error</p>}</>
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
                            {table.getRowModel().rows.map((row) => (
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
                            ))}
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
