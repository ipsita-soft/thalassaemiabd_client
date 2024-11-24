import React, { useState, useMemo } from 'react';
import { useFetchPatientsQuery, useDeletePatientMutation } from '@/api/patientApi';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

export type Payment = any;



const PatientList: React.FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const { data, isLoading, error } = useFetchPatientsQuery({ page, search });



    const columnHelper = createColumnHelper<Payment>();

    const [deletePatient] = useDeletePatientMutation();


    



    const columns = useMemo(
        () => [
            columnHelper.accessor('id', {
                header: 'ID',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (info) => info.getValue(),
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: (info) => {
                    const { id } = info.row.original;
                    return (
                        <div>
                            <button onClick={() => alert(`Edit ${id}`)}>Edit</button>
                            <button onClick={() => handleDelete(id)}>Delete</button>
                        </div>
                    );
                },
            }),
        ],
        []
    );

    const table = useReactTable({
        data: data?.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            await deletePatient(id);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading patients</div>;

    return (
        <div>
            <h1>Patient List</h1>
            <input
                type="text"
                placeholder="Search patients"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '10px' }}>
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
                <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
            </div>
        </div>
    );
};

export default PatientList;
