import { Link, useLocation, useParams } from "react-router-dom";
import { useFetchMedicalHistoriesQuery } from "@/api/medicalHistoryApi";
import { useState } from "react";
const Navbar = () => {
    const perPage = 4; // Number of items per page
    const search = "";
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error } = useFetchMedicalHistoriesQuery({
        perPage,
        search,
        page: currentPage,
        status: "1",
    });

    const { apId, apDate } = useParams();
    const location = useLocation();
    const isActive = (path: string) =>
        location.pathname === path ? "text-primary" : "";

    if (isLoading) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    if (error) {
        return <div>Error fetching data. Please try again later.</div>; // Placeholder for error state
    }

    const meta = data?.meta;
    const patientRegistrationData = data?.data || [];

    return (
        <div className="mt-6">
            {/* Scrollable Menu */}
            <div className="flex  overflow-x-auto  whitespace-nowrap pb-1 xl:max-w-6xl  lg:max-w-4xl space-x-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {patientRegistrationData.map((menu, index) => (
                    <div
                        key={menu.id || index}
                        className="mt-2 flex-shrink-0 transition-transform duration-200 ease-in-out transform hover:scale-105"
                    >
                        <Link
                            to={`/dashboard/patient-medical-history/${apId}/${menu.id}/${apDate}`}
                            className={`px-3 py-2 rounded-md transition-colors duration-300 ${isActive(
                                `/dashboard/patient-medical-history/${apId}/${menu.id}/${apDate}`
                            )
                                ? "bg-blue-300 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                                }`}
                        >
                            {menu.title}
                        </Link>

                    </div>
                ))}
            </div>

            {/* Pagination Section */}
            <div className="mt-6 flex justify-between items-center">
                <div className="flex space-x-3">
                    {meta?.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (link.url) {
                                    const page = new URL(link.url).searchParams.get("page");
                                    setCurrentPage(Number(page));
                                }
                            }}
                            disabled={!link.url}
                            className={`px-2 py-1 text-sm rounded-lg transition-all duration-200 ${link.active
                                ? "bg-blue-300 text-white hover:bg-blue-300"
                                : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                                } disabled:opacity-50`}
                        >
                            {link.label
                                .replace(/&laquo;/g, "<<")
                                .replace(/&raquo;/g, ">>")
                                .trim()}
                        </button>
                    ))}

                    <Link to={'/dashboard/appointments'}
                        className={`px-2 py-1 text-sm rounded-lg transition-all duration-200 bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-300`}
                    >

                        {'<<-'} Back To Appointments
                    </Link>

                </div>



            </div>

            {/* Scrollbar Styling */}
            <style>
                {`
                            .menu - container::-webkit-scrollbar {
                        height: 8px;
          }

                    .menu-container::-webkit-scrollbar-thumb {
                        background: #888;
                    border-radius: 4px;
          }

                    .menu-container::-webkit-scrollbar-thumb:hover {
                        background: #555;
          }
        `}
            </style>
        </div>
    );
};

export default Navbar;
