import { Outlet, useOutlet } from "react-router-dom";

import Dashboard from "@/client/userpanel/Dashboard";
import PanelFooter from "@/client/userpanel/PanelFooter";
import PanelHeader from "@/client/userpanel/Panelheader";

function UserPanelLayout() {
    const outlet = useOutlet();

    return (
        <div>
            <PanelHeader/>
            {outlet ? (
                <Outlet />
            ) : (
                <>
                <Dashboard/>
                </>
            )}
            <PanelFooter />
        </div>
    );
}

export default UserPanelLayout;
