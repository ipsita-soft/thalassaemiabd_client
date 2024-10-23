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

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

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
                <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
                    <User className="me-2" size={30} />  My Profile
                </h5>
                <p className="text-gray-500 mt-2">
                    Welcome back to your personalized dashboard.
                </p>
              {/* Notices Card */}
              <div className="row gy-4 mt-2">
                <div className="col-md-12 mt-2">
                {/* Main Content Section */}
                <div className="col-span-3">
                    <div className="  border p-10 rounded ">
                    {/* Gradient Decoration */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-transparent to-red-300 opacity-10 pointer-events-none"></div>

                    {/* Header Section */}
                        <div className="flex items-center space-x-8">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="w-20 h-20 rounded-full shadow-sm border-2 border-dark transform hover:scale-105 transition-transform"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Apurbo Ray</h2>
                                <p className="text-md text-gray-500">Software Engineer</p>
                            </div>
                            
                            {/* Edit Icon at the End */}
                            <div className="ml-auto">
                                <Link to="/userpanel/update-profile">
                                    <Edit className="h-6 w-6 text-red-600 hover:text-red-500 cursor-pointer" />
                                </Link>
                            </div>
                        </div>


                    {/* Profile Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                            Contact Information
                        </h3>
                        <ul className="space-y-2">
                            <li>
                            <span className="font-medium text-gray-600">Email:</span>{" "}
                            johndoe@email.com
                            </li>
                            <li>
                            <span className="font-medium text-gray-600">Phone:</span>{" "}
                            +1 234 567 890
                            </li>
                            <li>
                            <span className="font-medium text-gray-600">
                                Address:
                            </span>{" "}
                            1234 Elm Street, NY, USA
                            </li>
                        </ul>
                        </div>

                        <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                            About Me
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Passionate software engineer with 5+ years of experience in
                            building modern web applications. Skilled in React, Node.js,
                            and Laravel, with a focus on creating intuitive, scalable
                            solutions.
                        </p>
                        </div>
                    </div>

                    
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

export default MyProfile;
