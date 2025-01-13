import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetchPatientsReportsQuery } from "@/api/patientApi";
import { debounce } from "lodash";
import { SortingState, ColumnFiltersState, VisibilityState, getCoreRowModel, getSortedRowModel, getFilteredRowModel, useReactTable, flexRender } from "@tanstack/react-table";
import { Spinner } from "@/components/ui/spinner";
import './printStyles.css';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Show from "./Show";
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBloodGroup, fetchDiseaseType, fetchGenders } from '@/redux/slices/commonSlice';


const PatientReportForm: React.FC = () => {
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filterValue, setFilterValue] = useState("");

  const [formData, setFormData] = useState({
    blood_group_id: [] as number[],
    gender_id: [] as number[],
    disease_type_id: [] as number[],
    search: "",
    status: "",
    perPage: 15,
  });



  const dispatch = useDispatch<AppDispatch>();

  const { bloodGroups: blood, genders: gender, diseaseTypes: desType, isLoading: commonDataLoading } = useSelector((state: RootState) => state.commonData);

  useEffect(() => {
    dispatch(fetchGenders({ per_page: 250 }));
    dispatch(fetchBloodGroup({ per_page: 250 }));
    dispatch(fetchDiseaseType({ per_page: 250 }));
  }, [dispatch]);

  const handleMultiSelectChange = (name: string, value: number) => {
    setFormData((prev: any) => {
      const currentValues = prev[name] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v:any) => v !== value)
        : [...currentValues, value];
      return { ...prev, [name]: updatedValues };
    });
  };

  const debouncedRefetch = debounce(() => refetch(), 300);

  const { data, isLoading, error, refetch } = useFetchPatientsReportsQuery({
    blood_group_id: formData.blood_group_id.join(","),
    gender_id: formData.gender_id.join(","),
    disease_type_id: formData.disease_type_id.join(","),
    search,
    perPage,
    page: currentPage,
  });

  const columns = [
    {
      id: "serial",
      header: "SL No",
      cell: ({ row }: { row: { index: number } }) => (
        <div className="text-right">{row.index + 1}</div>
      ),
    },
    {
      id: "name",
      header: "Name",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="text-left">{row.original.name}</div>
      ),
    },
    {
      id: "bts-id",
      header: "BTS ID",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="text-left">{row.original.bts_id}</div>
      ),
    },
    {
      id: "old-bts-id",
      header: "OLD BTS ID",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="text-left">{row.original.patientInfo?.old_bts_id}</div>
      ),
    },
    {
      id: "phone",
      header: "Phone",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="text-left">{row.original.phone}</div>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="text-center">{row.original.status}</div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }: { row: { original: any } }) => {
        const data = row.original;
        return (
          <div className="flex items-center gap-2">
            <Show Id={data.id.toString()} open={false} onClose={() => { }} />
          </div>
        );
      },
    },
  ];

  const meta = data?.meta;

  // console.log(meta);
  // console.log(data);

  const table = useReactTable({
    data: data?.data || [],
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

  useEffect(() => {
    debouncedRefetch();
    return () => debouncedRefetch.cancel();
  }, [formData]);


  return (
    <>

      {commonDataLoading ? (
        <div>Loading...</div>
      ) : (<form className="space-y-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


            {/* Blood Group Section */}
            <div>
              <Label className="block text-sm text-lg text-gray-700">Blood Group</Label>
              <div className="mt-2 space-y-2">
                {blood.map((group: any) => (
                  <div key={group.id} className="flex items-center gap-3">
                    <Input
                      type="checkbox"
                      id={`blood-group-${group.id}`}
                      value={group.id}
                      checked={formData.blood_group_id.includes(group.id)}
                      onChange={() => handleMultiSelectChange("blood_group_id", group.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor={`blood-group-${group.id}`} className="text-sm text-gray-800">
                      {group.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>






            {/* Disease Type Section */}
            <div>
              <Label className="block text-sm text-lg text-gray-700">Disease Type</Label>
              <div className="mt-2 space-y-2">
                {desType.map((disease: any) => (
                  <div key={disease.id} className="flex items-center gap-3">
                    <Input
                      type="checkbox"
                      id={`disease-type-${disease.id}`}
                      value={disease.id}
                      checked={formData.disease_type_id.includes(disease.id)}
                      onChange={() => handleMultiSelectChange("disease_type_id", disease.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor={`disease-type-${disease.id}`} className="text-sm text-gray-800">
                      {disease.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>


            {/* Gender Section */}
            <div>
              <Label className="block text-sm text-lg text-gray-700">Gender</Label>
              <div className="mt-2 space-y-2">
                {gender.map((gender: any) => (
                  <div key={gender.id} className="flex items-center gap-3">
                    <Input
                      type="checkbox"
                      id={`gender-${gender.id}`}
                      value={gender.id}
                      checked={formData.gender_id.includes(gender.id)}
                      onChange={() => handleMultiSelectChange("gender_id", gender.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor={`gender-${gender.id}`} className="text-sm text-gray-800">
                      {gender.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

          </div>


        </div>
      </form>)

      }

      <div className="border px-4 py-5">
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
        </div>



        <Table className="mt-6">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="text-center text-red-600">Error: </div>
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

        {/* Pagination */}
        {meta && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {meta.from} to {meta.to} of {meta.total} entries
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === meta.last_page}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default PatientReportForm;
