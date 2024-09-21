import { Toaster } from "@/components/ui/toaster"
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
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

function DashboardLayout() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link to="/" className="flex items-center gap-2 font-semibold">
                                <Package2 className="h-6 w-6" />
                                <span className="">BTS</span>
                            </Link>
                            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                <Bell className="h-4 w-4" />
                                <span className="sr-only">Toggle notifications</span>
                            </Button>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <Link
                                    to="/dashboard/home"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/home') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    <Home className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/dashboard/payments"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/payments') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Payments
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        6
                                    </Badge>
                                </Link>


                                <Link
                                    to="/dashboard/slider"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/slider') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Slider
                                </Link>



                                <Link
                                    to="#"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('#') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    <Users className="h-4 w-4" />
                                    Customers
                                </Link>
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

                        <div className="mt-auto p-4">
                            <LogoutButton />
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
                                        to="#"
                                        className="flex items-center gap-2 text-lg font-semibold"
                                    >
                                        <Package2 className="h-6 w-6" />
                                        <span className="ml-4">BTS</span>
                                    </Link>
                                    <Link
                                        to="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Home className="h-5 w-5" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        Orders
                                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                            6
                                        </Badge>
                                    </Link>
                                    <Link
                                        to="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Package className="h-5 w-5" />
                                        Products
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
                    </header>

                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        <Outlet />

                        <Toaster />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
