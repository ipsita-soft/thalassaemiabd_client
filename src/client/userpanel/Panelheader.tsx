import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSetting } from "@/redux/slices/publicSlice";
import { User } from "lucide-react";

const PanelHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setting } = useSelector((state: RootState) => state.public);
  const location = useLocation(); // Detect active route

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Fetch settings on component load
  useEffect(() => {
    dispatch(fetchSetting({}));
  }, [dispatch]);

  // Toggle mobile menu
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // Adjust navbar collapse on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 400) setIsNavCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to add active class if the current path starts with the given path
  const isActive = (path: string) =>
    location.pathname.startsWith(path) ? "text-red-600 font-bold" : "";

  return (
    <header className="header navbar-area">
      <div className="container mx-auto">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="nav-inner">
              {/* Navbar */}
              <nav className="navbar navbar-expand-lg">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                  <img
                    src={setting?.headerlogo || "/default-logo.png"}
                    alt="Logo"
                    className=""
                  />
                </Link>

                {/* Mobile Menu Button */}
                <button
                  className={`navbar-toggler mobile-menu-btn ${isNavCollapsed ? "collapsed" : "active"}`}
                  type="button"
                  onClick={handleNavCollapse}
                  aria-controls="navbarSupportedContent"
                  aria-expanded={!isNavCollapsed}
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div
                  className={`navbar-collapse ${isNavCollapsed ? "collapse" : "show"}`}
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav ms-auto space-x-6 lg:space-x-8">
                    <li className="nav-item active">
                    <Link 
                        to="/userpanel" 
                        className={`hover:text-red-600 ${isActive("/userpanel")}`}
                        >
                        Dashboard
                    </Link>

                    </li>
                    <li className="nav-item">
                      <Link to="/notices" className={`hover:text-red-600 ${isActive("/notices")}`}>
                        Notices
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/annual-reports" className={`hover:text-red-600 ${isActive("/annual-reports")}`}>
                        Annual Reports
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/profile" className={`hover:text-red-600 ${isActive("/profile")}`}>
                        My Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/update-profile" className={`hover:text-red-600 ${isActive("/update-profile")}`}>
                        Update Profile
                      </Link>
                    </li>
                  </ul>

                  {/* Logout Button */}
                  <div className="ml-6">
                    <Link
                      to="/userpanel/my-profile"
                      className="btn flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      <User className="h-5 w-5" /> Profile
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PanelHeader;
