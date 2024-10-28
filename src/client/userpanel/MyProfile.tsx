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
    <div>
        <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
            <User className="me-2" size={30} />  My Profile
        </h5>
        <p className="text-gray-500 mt-2">
            Welcome back to your personalized dashboard.
        </p>

        <div className="row gy-4 mt-2">
          <div className="col-md-12 mt-2">
          {/* Main Content Section */}
          <div className="col-span-3">
              <div className="border p-10 rounded ">
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
  );
};

export default MyProfile;
