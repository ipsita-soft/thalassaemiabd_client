import { Link, useLocation } from 'react-router-dom';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"; // Adjust this path based on your project structure
import { useFetchMedicalHistoriesQuery } from "@/api/medicalHistoryApi";

const Navbar = () => {
    const perPage = 10;
    const search = "";
    const currentPage = 1;
    const { data, isLoading, error } = useFetchMedicalHistoriesQuery({
        perPage,
        search,
        page: currentPage,
    });

    const patientRegistrationData = data?.data || []; // Default to an empty array if no data

    const location = useLocation();

    // Function to add 'active' class based on current path
    const isActive = (path: string) => (location.pathname === path ? 'text-primary' : '');

    if (isLoading) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    if (error) {
        return <div>Error fetching data</div>; // Placeholder for error state
    }

    // Inline styles for the horizontal scrolling container
    const styles = {
        menuContainer: {
            display: 'flex', // Arrange items in a row
            overflowX: 'auto', // Enable horizontal scrolling for overflow
            whiteSpace: 'nowrap', // Prevent items from wrapping to the next line
            padding: '10px', // Add padding for better spacing
            maxWidth: '1000px', // Limit width to fit 4 items (adjust as needed)
            
        },
        scrollbar: {
            scrollbarWidth: 'thin', // For Firefox
            scrollbarColor: '#888 #f1f1f1', // For Firefox
        },
    };

    

    return (
        <div className="mt-4">
            <Menubar>
                <MenubarMenu>
                    {/* Apply inline styles for horizontal scrolling */}
                    <div style={{ ...styles.menuContainer, ...styles.scrollbar }} className="menu-container">
                        {patientRegistrationData.map((menu, index) => (
                            <MenubarTrigger key={menu.id || index} className="mr-4 mt-2">
                                <Link className={isActive(menu.id || '')} to={menu.id || ''}>
                                    {menu.title}
                                </Link>
                            </MenubarTrigger>
                        ))}
                    </div>
                </MenubarMenu>
            </Menubar>

            {/* Inline CSS for the scrollbar */}
            <style>
                {`
                    .menu-container::-webkit-scrollbar {
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
