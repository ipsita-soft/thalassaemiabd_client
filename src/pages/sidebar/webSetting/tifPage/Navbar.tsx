import { Link, useLocation } from 'react-router-dom';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"; // Adjust this path based on your project structure

const Navbar = () => {
    const location = useLocation();

    // Function to add 'active' class based on current path
    const isActive = (path: string) => location.pathname === path ? 'text-primary' : '';

    return (
        <div className="mb-4">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link className={isActive('/dashboard/tif-page')} to="/dashboard/tif-page">Tif Page</Link>
                    </MenubarTrigger>

                    <MenubarTrigger>
                        <Link className={isActive('/dashboard/tif-page-slider')} to="/dashboard/tif-page-slider">Tif Page Sliders</Link>
                    </MenubarTrigger>

                </MenubarMenu>
            </Menubar>
        </div>
    );
};

export default Navbar;
