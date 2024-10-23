import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  Bell,
  User,
  Edit,
  LogOut,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getLinkClasses = (tab) =>
    `nav-link px-3 py-2 rounded ${
      activeTab === tab
        ? "bg-red-100 text-red-600 font-bold"
        : "text-gray-700 hover:bg-gray-100 hover:text-red-500"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 p-4">
      <div className="container mx-auto h-100">
        {/* Flex Container for Sidebar and Main Content */}
        <div className="row mt-5 pt-4 gy-4 d-flex h-100 align-items-stretch">
          
        {/* Sidebar Section */}
        <div className="col-md-3 d-flex flex-column" style={{ height: '80vh' }}>
          <div className="sidebar bg-white p-4 shadow-lg rounded d-flex flex-column" style={{ flex: '1 1 auto', overflowY: 'auto' }}>
            <ul className="nav flex-column mb-auto">
              <li className="nav-item mb-3">
                <Link
                  to="/userpanel"
                  className={`d-flex align-items-center ${getLinkClasses("dashboard")}`}
                  onClick={() => handleTabClick("dashboard")}
                >
                  <Home className="me-2" size={20} />
                  Dashboard
                </Link>                        
              </li>

              <li className="nav-item mb-3">
                <Link
                  to="/userpanel/notices"
                  className={`d-flex align-items-center ${getLinkClasses("notices")}`}
                  onClick={() => handleTabClick("notices")}
                >
                  <Bell className="me-2" size={20} />
                  Notices
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  to="/userpanel/annual-reports"
                  className={`d-flex align-items-center ${getLinkClasses("annual-reports")}`}
                  onClick={() => handleTabClick("annual-reports")}
                >
                  <FileText className="me-2" size={20} />
                  Annual Reports
                </Link>
              </li>
             
              <li className="nav-item mb-3">
                <Link
                  to="/userpanel/my-profile"
                  className={`d-flex align-items-center ${getLinkClasses("profile")}`}
                  onClick={() => handleTabClick("profile")}
                >
                  <User className="me-2" size={20} />
                  My Profile
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  to="/userpanel/update-profile"
                  className={`d-flex align-items-center ${getLinkClasses("update-profile")}`}
                  onClick={() => handleTabClick("update-profile")}
                >
                  <Edit className="me-2" size={20} />
                  Update Profile
                </Link>
              </li>
              
            </ul>

            <a
              href="#"
              className="nav-link px-3 py-2 rounded bg-red-500 text-white mt-auto d-flex align-items-center gap-2"
            >
              <LogOut className="h-5 w-5" /> Logout
            </a>
          </div>
        </div>

          {/* Main Content Section */}
          <div className="col-md-9 card border-none shadow-lg h-200">
            <div className="card-body d-flex flex-column">
              <h5 className="text-2xl mt-2 font-extrabold d-flex text-red-600">
                <Home className="me-2" size={30} /> Hello, Apurbo!
              </h5>
              <p className="text-gray-500 mt-2">
                Welcome back to your personalized dashboard.
              </p>

              {/* Notices Card */}
              <div className="row gy-4 mt-2">
                <div className="col-md-6 mt-2">
                  <div className="h-100 border rounded">
                    <div className="card-body d-flex flex-column">
                      <h2 className="card-title font-bold d-flex align-items-center text-red-600 mb-3">
                        <Bell className="me-2" size={20} /> Latest Notices
                      </h2>
                      <ul
                        className="list-group overflow-auto mb-3"
                        style={{
                          maxHeight: "200px",
                          scrollbarWidth: "thin",
                        }}
                      >
                        {Array(5)
                          .fill()
                          .map((_, index) => (
                            <li className="list-group-item border mb-1" key={index}>
                              <a
                                href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-flex align-items-center text-decoration-none"
                                style={{
                                  color: "#C53030",
                                  transition: "color 0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.color = "red")}
                                onMouseOut={(e) => (e.target.style.color = "green")}
                              >
                                <Bell className="me-2" size={15} /> {index + 1}. Download and review your latest report.
                              </a>
                            </li>
                          ))}
                      </ul>

                      <button className="btn btn-red text-red-500 mt-auto">
                        See All Notices
                      </button>
                    </div>
                  </div>
                </div>


                {/* Annual Reports Card */}
                <div className="col-md-6 mt-2">
                  <div className="h-100 border rounded">
                    <div className="card-body d-flex flex-column">
                      <h2 className="card-title font-bold d-flex align-items-center text-red-600 mb-3">
                        <FileText className="me-2" size={20} /> Annual Reports
                      </h2>
                      <ul
                        className="list-group overflow-auto mb-3"
                        style={{
                          maxHeight: "200px",
                          scrollbarWidth: "thin",
                        }}
                      >
                        {Array(5)
                          .fill()
                          .map((_, index) => (
                            <li className="list-group-item border mb-1" key={index}>
                              <a
                                href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-flex align-items-center text-decoration-none"
                                style={{
                                  color: "#C53030",
                                  transition: "color 0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.color = "red")}
                                onMouseOut={(e) => (e.target.style.color = "green")}
                              >
                                 <FileText className="me-2" size={15} /> {index + 1}. Download and review your latest report.
                              </a>
                            </li>
                          ))}
                      </ul>

                      <button className="btn btn-red text-red-500 mt-auto">
                        See All Reports
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
