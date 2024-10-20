import { Outlet, useOutlet } from "react-router-dom";

import Footer from "@/client/page/Footer";
import Header from "@/client/page/HeaderSection";
import Dashboard from "@/client/page/Dashboard";

function UserPanelLayout() {
    const outlet = useOutlet();

    return (
        <div>
            <Header />
            {outlet ? (
                <Outlet />
            ) : (
                <>
                    <Dashboard />
                </>
            )}

            <Footer />
        </div>
    );
}

export default UserPanelLayout;
