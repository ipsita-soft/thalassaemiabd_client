

import { Navigate, Outlet, useOutlet } from "react-router-dom";
import PanelHeader from "@/client/userpanel/Panelheader";
import PanelFooter from "@/client/userpanel/PanelFooter";
import Sidebar from "@/client/userpanel/sidebar";
import Dashboard from "@/client/userpanel/Dashboard";
import { useState } from "react";
import { useSelector } from "react-redux";

const UserPanelLayout = () => {
  const { user } = useSelector((state: any) => state.auth);
  if (user.bts_id === null) return <Navigate to="/registration-success" />;
  const outlet = useOutlet();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  console.log(activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 py-4">
      <PanelHeader />
      <div className="container">
        <div className="row mt-5 pt-4 gy-4 d-flex h-100 align-items-stretch">
          {/* Sidebar Section */}
          <Sidebar onTabClick={handleTabClick} />


          {/* Main Content Section */}
          <div className="col-md-9 mb-3 card border-none shadow-lg " style={{ height: "auto" }}>
            <div className="card-body d-flex flex-column">
              {outlet ? (
                <Outlet />
              ) : (
                <>
                  <Dashboard />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <PanelFooter />
    </div>
  );
};

export default UserPanelLayout;
