import { Link, useLocation } from "react-router-dom";
import { Home, Bell, FileText, User, Edit, History, FileCheck, CalendarCheck, Clock, Pill, Droplet } from "lucide-react";
import LogoutButton from "@/components/auth/Logout";
import { useSelector } from "react-redux";

interface SidebarProps {
  onTabClick: (tabName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabClick }) => {
  const location = useLocation();
  const { permissions } = useSelector((state: any) => state.auth);

  console.log("User Permissions:", permissions);

  const getLinkClasses = (path: string) =>
    `nav-link px-3 py-2 rounded ${
      location.pathname.includes(path)
        ? "bg-red-100 text-red-600 font-bold"
        : "text-gray-700 hover:bg-gray-100 hover:text-red-500"
    }`;

  return (
    <div className="col-md-3 d-flex flex-column mb-4" style={{ height: "80vh" }}>
      <div
        className="sidebar bg-white p-4 shadow-lg rounded d-flex flex-column"
        style={{ flex: "1 1 auto", overflowY: "auto" }}
      >
        <ul className="nav flex-column mb-auto">
          {/* Dashboard Menu */}
          {permissions.includes("userdashboard") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel"
                className={`d-flex align-items-center ${getLinkClasses("/userpanel")}`}
                onClick={() => onTabClick("dashboard")}
              >
                <Home className="me-2" size={20} />
                Dashboard
              </Link>
            </li>
          )}

          {/* Profile Menu */}
          {permissions.includes("profile_view") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/my-profile"
                className={`d-flex align-items-center ${getLinkClasses("my-profile")}`}
                onClick={() => onTabClick("profile")}
              >
                <User className="me-2" size={20} />
                My Profile
              </Link>
            </li>
          )}

          {/* Update Profile Menu */}
          {permissions.includes("profile_edit") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/update-profile"
                className={`d-flex align-items-center ${getLinkClasses("update-profile")}`}
                onClick={() => onTabClick("update-profile")}
              >
                <Edit className="me-2" size={20} />
                Update Profile
              </Link>
            </li>
          )}

          {/* Medical History */}
          {permissions.includes("self-medical-history") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/medical-history"
                className={`d-flex align-items-center ${getLinkClasses("medical-history")}`}
                onClick={() => onTabClick("medical-history")}
              >
                <History className="me-2" size={20} />
                Medical History
              </Link>
            </li>
          )}

          {/* prescription  */}
          {permissions.includes("self-prescription") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/prescription"
                className={`d-flex align-items-center ${getLinkClasses("prescription")}`}
                onClick={() => onTabClick("prescription")}
              >
                <FileCheck className="me-2" size={20} />
                Prescription
              </Link>
            </li>
          )}

          {/* Appointment */}
          {permissions.includes("self-appointment") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/appointment"
                className={`d-flex align-items-center ${getLinkClasses("appointment")}`}
                onClick={() => onTabClick("appointment")}
              >
                <CalendarCheck className="me-2" size={20} />
                Appointment
              </Link>
            </li>
          )}

          {/* Medicine */}
          {permissions.includes("prescribed-medicines") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/medicine"
                className={`d-flex align-items-center ${getLinkClasses("medicine")}`}
                onClick={() => onTabClick("medicine")}
              >
                <Pill className="me-2" size={20} />
                Medicine
              </Link>
            </li>
          )}

          {/* Medical Report */}
          {permissions.includes("self-medical-report") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/medical-report"
                className={`d-flex align-items-center ${getLinkClasses("medical-report")}`}
                onClick={() => onTabClick("medical-report")}
              >
                <FileText className="me-2" size={20} />
                Medical Report
              </Link>
            </li>
          )}

          {/* Reminder */}
          {permissions.includes("self-reminder") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/reminder"
                className={`d-flex align-items-center ${getLinkClasses("reminder")}`}
                onClick={() => onTabClick("reminder")}
              >
                <Clock className="me-2" size={20} />
                Reminder
              </Link>
            </li>
          )}

          {/* Notices Menu */}
          {permissions.includes("notice") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/notices"
                className={`d-flex align-items-center ${getLinkClasses("notices")}`}
                onClick={() => onTabClick("notices")}
              >
                <Bell className="me-2" size={20} />
                Notices
              </Link>
            </li>
          )}

          {/* Annual Reports Menu */}
          {permissions.includes("annualreport") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/annual-reports"
                className={`d-flex align-items-center ${getLinkClasses("annual-reports")}`}
                onClick={() => onTabClick("annual-reports")}
              >
                <FileText className="me-2" size={20} />
                Annual Reports
              </Link>
            </li>
          )}


          {/* Donation History */}
          {permissions.includes("self-donation-history") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/blood-donation-history"
                className={`d-flex align-items-center ${getLinkClasses("blood-donation-history")}`}
                onClick={() => onTabClick("blood-donation-history")}
              >
                <FileText className="me-2" size={20} />
                Blood Donation History
              </Link>
            </li>
          )}

          {/* Blood Report */}
          {permissions.includes("self-blood-report") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/blood-report"
                className={`d-flex align-items-center ${getLinkClasses("blood-report")}`}
                onClick={() => onTabClick("blood-report")}
              >
                <Droplet className="me-2" size={20} />
                Blood Report
              </Link>
            </li>
          )}

          {/* Blood Donate Request */}
          {permissions.includes("self-blood-donate-request") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/blood-donate-request"
                className={`d-flex align-items-center ${getLinkClasses("blood-donate-request")}`}
                onClick={() => onTabClick("blood-donate-request")}
              >
                <FileText className="me-2" size={20} />
                Blood Donate Request
              </Link>
            </li>
          )}

          {/* Donate Now */}
          {permissions.includes("user-donate-now") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/donate-now"
                className={`d-flex align-items-center ${getLinkClasses("donate-now")}`}
                onClick={() => onTabClick("donate-now")}
              >
                <FileText className="me-2" size={20} />
                Donate Now
              </Link>
            </li>
          )}

          {/* Donation History */}
          {permissions.includes("user-donation-history") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/donation-history"
                className={`d-flex align-items-center ${getLinkClasses("donation-history")}`}
                onClick={() => onTabClick("donation-history")}
              >
                <FileText className="me-2" size={20} />
                Donation History
              </Link>
            </li>
          )}

          {/* Sponsor Child */}
          {permissions.includes("user-sponsor-child") && (
            <li className="nav-item mb-3">
              <Link
                to="/userpanel/sponsor-child"
                className={`d-flex align-items-center ${getLinkClasses("sponsor-child")}`}
                onClick={() => onTabClick("sponsor-child")}
              >
                <FileText className="me-2" size={20} />
                Sponsor Child
              </Link>
            </li>
          )}




        </ul>

        {/* Logout Button */}
        <LogoutButton className="nav-link px-3 py-2 rounded bg-red-500 text-white mt-auto d-flex align-items-center gap-2" />
      </div>
    </div>
  );
};

export default Sidebar;
