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
    <div>
      <div className="">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-transparent to-red-300 opacity-10 pointer-events-none"></div>
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
  );
};

export default Dashboard;
