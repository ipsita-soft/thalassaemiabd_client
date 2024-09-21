import React, { useEffect, useState } from "react";
import {
    ColumnDef,
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
import NewSliderModal from "./NewSliderModal";
import EditSliderModal from "./EditSlider";
import { fetchSliders } from "@/redux/slices/sliderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DeleteSlider from "./DeleteSlider";
import { useToast } from '@/hooks/use-toast';
export type Slider = {
    id: number;
    image: string;
    sorting_index: number;
    status: "Active" | "Inactive";
};

const columns: ColumnDef<Slider>[] = [
    {
        id: "serial",
        header: "SL No",
        cell: ({ row }) => <div className="text-right">{row.index + 1}</div>,
    },
    {
        id: "image",
        header: "Image",
        cell: ({ row }) => (
            <img
                src={row.original.image}
                alt="Slider"
                className="w-16 h-16 object-cover"
            />
        ),
    },
    {
        accessorKey: "sorting_index",
        header: ({ column }) => (
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
        cell: ({ row }) => (
            <div className="text-center">{row.original.sorting_index}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="text-center">{row.original.status}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const slider = row.original;
            const [isEditModalOpen, setEditModalOpen] = useState(false);
            const dispatch = useDispatch(); // Move useDispatch here
            const { toast } = useToast();
            const handleDeleteSuccess = () => {
                toast({
                    title: 'Success',
                    description: 'Slider delete successfully!',
                });
                dispatch(fetchSliders({})); // Dispatch here
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <EditSliderModal
                            sliderId={slider.id}
                            open={isEditModalOpen}
                            onClose={() => setEditModalOpen(false)}
                        />

                        <DeleteSlider
                            id={slider.id}
                            onSuccess={handleDeleteSuccess} // Pass the callback here
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function SliderPage() {
    const dispatch = useDispatch();
    const { sliders, meta, isLoading, isError, error } = useSelector(
        (state: RootState) => state.sliders
    );

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [filterValue, setFilterValue] = useState("");
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        const params = {
            status: 1,
            per_page: perPage,
        };
        dispatch(fetchSliders(params));
    }, [dispatch, perPage]);

    const table = useReactTable({
        data: sliders,
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
                <div className="flex items-center ">
                    <label className="text-slate-500" htmlFor="perPage">Per Page :</label>
                    <select
                        id="perPage"
                        value={perPage}
                        onChange={handlePerPageChange}
                        className="ml-2 p-2 rounded "
                    >
                        <option value={10}>10</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                    </select>
                </div>
                <NewSliderModal />
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error: {error.message}</p>
            ) : (
                <>
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
                    <div className="flex justify-between items-center mt-4 ">
                        <div className="mt-5">
                            <p> Showing {meta?.from} to {meta?.to} of {meta?.total} entries</p>
                        </div>
                        <div className="flex space-x-2">
                            {meta && (
                                <div className="flex justify-between space-x-2 mt-4">
                                    <p
                                        disabled={!meta?.links?.prev}
                                        onClick={() =>
                                            dispatch(
                                                fetchSliders({ page: meta.current_page - 1, per_page: perPage })
                                            )
                                        }
                                    >
                                    </p>

                                    {meta?.links?.map((link, index) => (
                                        link.url ? (
                                            <Button
                                                key={index}
                                                variant={link.active ? "solid" : "outline"}
                                                onClick={() =>
                                                    dispatch(fetchSliders({ page: link.url.split("=")[1], per_page: perPage }))
                                                }
                                            >
                                                {link.label.replace(/&laquo;|&raquo;/g, '')}
                                            </Button>
                                        ) : null
                                    ))}

                                    <p
                                        disabled={!meta?.links?.next}
                                        onClick={() =>
                                            dispatch(
                                                fetchSliders({ page: meta.current_page + 1, per_page: perPage })
                                            )
                                        }
                                    >
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
