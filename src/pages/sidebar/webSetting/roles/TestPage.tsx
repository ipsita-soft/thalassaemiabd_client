import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Mail, Phone, User } from "lucide-react"

export type Payment = any;

const data: Payment[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
        name: "Ken",  // Example name data
        phone: "123-456-7890", // Example phone data
    },
    //... other data entries
]

const columnHelper = createColumnHelper<Payment>();

const columns = [
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: () => (
            <span>
                <User className="mr-2" size={16} />
                ID
            </span>
        ),
    }),
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => (
            <span>
                <User className="mr-2" size={16} />
                Name
            </span>
        ),
    }),
    columnHelper.accessor("email", {
        cell: (info) => (
            <span className="italic text-blue-600">
                {info.getValue()}
            </span>
        ),
        header: () => (
            <span>
                <Mail className="mr-2" size={16} />
                Email
            </span>
        ),
    }),
    columnHelper.accessor("phone", {
        cell: (info) => info.getValue(),
        header: () => (
            <span>
                <Phone className="mr-2" size={16} />
                Phone
            </span>
        ),
    }),
];

export function TestPage() {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getCoreRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-200">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
