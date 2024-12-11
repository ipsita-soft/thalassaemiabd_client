import { Link, useLocation } from "react-router-dom";
import { Home, Bell, FileText, User, Edit } from "lucide-react";
import LogoutButton from '@/components/auth/Logout';
import { useSelector } from "react-redux";

interface SidebarProps {
  onTabClick: (tabName: string) => void;
}

const hasPermissions = (requiredPermissions: string[], userPermissions: string[]) => {
  return requiredPermissions.every(perm => userPermissions.includes(perm));
};


const Sidebar: React.FC<SidebarProps> = ({ onTabClick }) => {
  const location = useLocation();
  const { permissions } = useSelector((state: any) => state.auth);
  const getLinkClasses = (path: string) =>
    `nav-link px-3 py-2 rounded ${location.pathname.includes(path)
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
          <li className="nav-item mb-3">
            <Link
              to="/userpanel"
              className={`d-flex align-items-center ${getLinkClasses("/userpanel")}`}
              // style={{background:'#76cf76'}}
              onClick={() => onTabClick("dashboard")}
            >
              <Home className="me-2" size={20} />
              Dashboard
            </Link>
          </li>

          {hasPermissions(['profile_view'], permissions) && (
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


          {hasPermissions(['profile_edit'], permissions) && (
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

          <li className="nav-item mb-3">
            <Link
              to="/userpanel/blood-donation-history"
              className={`d-flex align-items-center ${getLinkClasses("blood-donation-history")}`}
              onClick={() => onTabClick("blood-donation-history")}
            >
              <Edit className="me-2" size={20} />
              Blood Donation History
            </Link>
          </li>

          <li className="nav-item mb-3">
            <Link
              to="/userpanel/health-history"
              className={`d-flex align-items-center ${getLinkClasses("health-history")}`}
              onClick={() => onTabClick("health-history")}
            >
              <Edit className="me-2" size={20} />
              Health History
            </Link>
          </li>
        </ul>

        <LogoutButton className="nav-link px-3 py-2 rounded bg-red-500 text-white mt-auto d-flex align-items-center gap-2" />
      </div>
    </div>
  );
};

export default Sidebar;
