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
                        <Link className={isActive('/dashboard/user-request')} to="/dashboard/user-request">All</Link>
                    </MenubarTrigger>

                    <MenubarTrigger>
                        <Link className={isActive('/dashboard/user-pending')} to="/dashboard/user-pending">Pending</Link>
                    </MenubarTrigger>


                    <MenubarTrigger>
                        <Link className={isActive('/dashboard/user-rejected')} to="/dashboard/user-rejected">Rejected</Link>
                    </MenubarTrigger>

                </MenubarMenu>
            </Menubar>
        </div>
    );
};

export default Navbar;
