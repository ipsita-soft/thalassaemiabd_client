import { Toaster } from "@/components/ui/toaster"
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Search,
    ShoppingCart,
    Sliders,
    Users,
    HospitalIcon,
    Newspaper,
    Calendar,
    HandHeart,
    AlignStartVertical,
    GalleryVerticalEnd,
    Settings,
    TargetIcon,
    HistoryIcon,
    List,
    CalendarClock,
    Book,
    UserCog,
    UserRoundSearch,
    BookUser,
    SquareUser,
    UserRoundCheck,
    Layers,
    History,
    Library

} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LogoutButton from '../components/auth/Logout';
import { useSelector } from "react-redux";

const hasPermissions = (requiredPermissions: string[], userPermissions: string[]) => {
    return requiredPermissions.every(perm => userPermissions.includes(perm));
};

function DashboardLayout() {
    const location = useLocation();
    const id = 1;

    const isActive = (path: string) => location.pathname === path;
    const { permissions } = useSelector((state: any) => state.auth);
    // console.log(permissions);

    return (
        <div>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link to="/" className="flex items-center gap-2 font-semibold">
                                <HospitalIcon className="h-6 w-6" />
                                <span className="">BTS</span>
                            </Link>
                            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                <Bell className="h-4 w-4" />
                                <span className="sr-only">Toggle notifications</span>
                            </Button>
                        </div>
                        <div className="flex-1">

                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4" style={{ maxHeight: '90vh', overflowY: 'auto' }}>


                                {hasPermissions(['view_dashboard'], permissions) && (
                                    <Link
                                        to="/dashboard/home"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/home') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'}`}
                                    >
                                        <Home className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                )}

                                {/* Check for 'view_payments' permission */}
                                {hasPermissions(['view_payments'], permissions) && (
                                    <Link
                                        to="/dashboard/payments"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/payments') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'}`}
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                        Payments
                                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                            6
                                        </Badge>
                                    </Link>
                                )}




                                <Link
                                    to="/dashboard/slider"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/slider') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    <Sliders className="h-4 w-4" />
                                    Slider
                                </Link>


                                {hasPermissions(['blogNews-all'], permissions) && (
                                    < Link
                                        to="/dashboard/blog-news"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/blog-news') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <Newspaper className="h-4 w-4" />
                                        Blog & News
                                    </Link>
                                )}


                                {hasPermissions(['blogNews-all'], permissions) && (
                                    < Link
                                        to="/dashboard/story"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/story') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <Newspaper className="h-4 w-4" />
                                        Story
                                    </Link>
                                )}



                                {hasPermissions(['event-all'], permissions) && (
                                    <Link
                                        to="/dashboard/events"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/events') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Events
                                    </Link>
                                )}


                                {hasPermissions(['notice-all'], permissions) && (
                                    <Link
                                        to="/dashboard/notices"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/notices') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <CalendarClock className="h-4 w-4" />
                                        Notices
                                    </Link>
                                )}

                                {hasPermissions(['publications-all'], permissions) && (
                                    <Link
                                        to="/dashboard/publications"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/publications') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <Book className="h-4 w-4" />
                                        Publications
                                    </Link>

                                )}

                                <Link
                                    to="/dashboard/wishers"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/wishers') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    <HandHeart className="h-4 w-4" />
                                    Wishers
                                </Link>

                                {hasPermissions(['doctorSlider-all'], permissions) && (

                                    <Link
                                        to="/dashboard/doctor-sliders"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/doctor-sliders') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <AlignStartVertical className="h-4 w-4" />
                                        Doctor Sliders
                                    </Link>
                                )}


                                {hasPermissions(['projects-all'], permissions) && (
                                    <Link
                                        to="/dashboard/our-projects"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/our-projects') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <List className="h-4 w-4" />
                                        Our Projects
                                    </Link>
                                )}


                                {hasPermissions(['whoWeAre-all'], permissions) && (
                                    <Link
                                        to="/dashboard/who-we-are"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/who-we-are') || isActive('/dashboard/years') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <Users className="h-4 w-4" />
                                        Who We Are
                                    </Link>
                                )}


                                {hasPermissions(['galleries-all'], permissions) && (

                                    <Link
                                        to="/dashboard/galleries"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/galleries') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <GalleryVerticalEnd className="h-4 w-4" />
                                        galleries
                                    </Link>
                                )}


                                {hasPermissions(['settings-all'], permissions) && (
                                    <Link

                                        to={`/dashboard/settings/${id}`}  // Dynamically insert the 'id'
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive(`/dashboard/settings/${id}`)
                                            ? 'bg-muted text-primary'
                                            : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </Link>
                                )}


                                {hasPermissions(['mission-vision-all'], permissions) && (
                                    <Link

                                        to={`/dashboard/mission-vision/${id}`}  // Dynamically insert the 'id'
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive(`/dashboard/mission-vision/${id}`)
                                            ? 'bg-muted text-primary'
                                            : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <TargetIcon className="h-4 w-4" />
                                        Mission vision
                                    </Link>
                                )}


                                {hasPermissions(['bts-history-all'], permissions) && (
                                    <Link

                                        to={`/dashboard/bts-history/${id}`}  // Dynamically insert the 'id'
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive(`/dashboard/bts-history/${id}`)
                                            ? 'bg-muted text-primary'
                                            : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <HistoryIcon className="h-4 w-4" />
                                        Bts History
                                    </Link>
                                )}


                                {hasPermissions(['tif-member-all'], permissions) && (

                                    <Link
                                        to="/dashboard/tif-page"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/tif-page') || isActive('/dashboard/tif-page-slider') || isActive('/dashboard/tif-page-attachment') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <Layers className="h-4 w-4" />
                                        Tif Page
                                    </Link>
                                )}


                                {hasPermissions(['view_roles', 'create_role', 'edit_role', 'delete_user'], permissions) && (

                                    <Link
                                        to="/dashboard/roles"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/roles') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        <UserCog className="h-4 w-4" />
                                        Roles
                                    </Link>
                                )}


                                {hasPermissions([
                                    'user-request-list',
                                    'user-request-show',
                                    'user-request-update',
                                ], permissions) && (

                                        <Link
                                            to="/dashboard/user-request"
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/user-request') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                }`}
                                        >

                                            <UserRoundSearch className="h-4 w-4" />
                                            Applications
                                        </Link>
                                    )}




                                {hasPermissions([
                                    'admin-blood-donor-all',
                                ], permissions) && (

                                        <Link
                                            to="/dashboard/blood-donors"
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/blood-donors') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                }`}
                                        >
                                            <BookUser className="h-4 w-4" />
                                            Blood Donor
                                        </Link>
                                    )
                                    }




                                {hasPermissions([
                                    'medical-history-all',
                                ], permissions) && (

                                        <Link
                                            to="/dashboard/financial-donation"
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/financial-donation') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                }`}
                                        >
                                            <BookUser className="h-4 w-4" />
                                            Financial Donation
                                        </Link>
                                    )}


                                <hr className="mx-2 my-2" />



                                {/* {hasPermissions([
                                    'medical-history-all',
                                ], permissions) && (

                                        <Link
                                            to="/dashboard/patient-medical-history"
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/medical-history') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                }`}
                                        >
                                            <History className="h-4 w-4" />
                                            Patient Medical History
                                        </Link>
                                    )} */}




                                {hasPermissions([
                                    'admin-patient-all',
                                ], permissions) && (

                                        <Link
                                            to="/dashboard/admin-patient"
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/admin-patient') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                }`}
                                        >
                                            <SquareUser className="h-4 w-4" />
                                            Patients
                                        </Link>
                                    )}





                                {hasPermissions([
                                    'medical-history-all',
                                ], permissions) && (

                                        <Link
                                            to="/dashboard/medical-history"
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/medical-history') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                }`}
                                        >
                                            <History className="h-4 w-4" />
                                            Medical History
                                        </Link>
                                    )}





                                {hasPermissions([
                                    'medical-history-item-all',
                                ], permissions) && (

                                        <Link
                                            to="/dashboard/medical-history-item"
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/medical-history-item') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                }`}
                                        >
                                            <Library className="h-4 w-4" />
                                            Medical History Item
                                        </Link>
                                    )}


                                {hasPermissions([
                                    'appointment-all',
                                ], permissions) && (

                                        <Link
                                            to="/dashboard/appointments"
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/appointments') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                }`}
                                        >

                                            <UserRoundCheck className="h-4 w-4" />
                                            Appointments
                                        </Link>
                                    )}



                                {hasPermissions([
                                    'admin-user-all',
                                ], permissions) && (

                                        <Link
                                            to="/dashboard/admin-user"
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                             ${isActive('/dashboard/admin-user') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                }`}
                                        >

                                            <UserRoundCheck className="h-4 w-4" />
                                            Users
                                        </Link>
                                    )}






                                {/* <Link
                                    to="test"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('#') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    <Users className="h-4 w-4" />
                                    test
                                </Link> */}


                                <Link
                                    to="#"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('#') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    <LineChart className="h-4 w-4" />
                                    Analytics
                                </Link>
                            </nav>
                        </div>


                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 text-lg font-medium">
                                    <Link
                                        to="/"
                                        className="flex items-center gap-2 text-lg font-semibold"
                                    >
                                        <HospitalIcon className="h-6 w-6" />
                                        <span className="ml-4">BTS</span>
                                    </Link>

                                    <Link
                                        to="/dashboard/home"
                                        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground  ${isActive('/dashboard/home') ? ' bg-muted  ' : ' hover:text-foreground'
                                            }`}
                                    >
                                        <Home className="h-5 w-5" />
                                        Dashboard
                                    </Link>




                                    <Link
                                        to="/dashboard/slider"
                                        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground  ${isActive('/dashboard/slider') ? ' bg-muted  ' : ' hover:text-foreground'
                                            }`}
                                    >
                                        <Sliders className="h-4 w-4" />
                                        Slider
                                    </Link>


                                    <Link
                                        to="/dashboard/payments"
                                        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground  ${isActive('/dashboard/payments') ? ' bg-muted  ' : ' hover:text-foreground'
                                            }`}
                                    >
                                        <Package className="h-5 w-5" />
                                        Payments

                                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                            6
                                        </Badge>
                                    </Link>
                                    <Link
                                        to="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Users className="h-5 w-5" />
                                        Customers
                                    </Link>
                                    <Link
                                        to="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <LineChart className="h-5 w-5" />
                                        Analytics
                                    </Link>
                                </nav>

                                <div className="mt-auto">
                                    <LogoutButton />
                                </div>
                            </SheetContent>
                        </Sheet>
                        <div className="w-full flex-1">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="   Search products..."
                                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                    />
                                </div>
                            </form>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />

                                {/* <DropdownMenuItem><Link to='/login'>Logout</Link></DropdownMenuItem> */}
                            </DropdownMenuContent>
                        </DropdownMenu>


                        <LogoutButton />

                    </header>

                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        <Outlet />

                        <Toaster />
                    </main>
                </div>
            </div>
        </div >
    );
}

export default DashboardLayout;
