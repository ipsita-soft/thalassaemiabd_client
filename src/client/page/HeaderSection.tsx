import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsNavCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header navbar-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="nav-inner">
              {/* Start Navbar */}
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="index.html">
                  <img src="/client/assets/images/logo/logo.png" alt="Logo" />
                </a>

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

                <div
                  className={`navbar-collapse ${isNavCollapsed ? "collapse" : "show"}`}
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <a
                        className="page-scroll active dd-menu collapsed"
                        href="index.html"
                        data-bs-toggle="collapse"
                        data-bs-target="#submenu-1-1"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        Home
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="page-scroll dd-menu collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#submenu-1-2"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        Who we are
                      </a>
                      <ul className="sub-menu collapse" id="submenu-1-2">
                        <li className="nav-item">
                          <a href="bts-history.html">BTS History</a>
                        </li>
                        <li className="nav-item">
                          <a href="mission&vision.html">Vision & Mission</a>
                        </li>
                        <li className="nav-item">
                          <a href="tif-membership.html">TIF Membership</a>
                        </li>
                        <li className="nav-item">
                          <a href="our-projects.html">Our Projects</a>
                        </li>
                        <li className="nav-item">
                          <a href="advisors.html">Advisors</a>
                        </li>
                        <li className="nav-item">
                          <a href="Committee.html">Executive Committee</a>
                        </li>
                        <li className="nav-item">
                          <a href="collection-committee.html">
                            Blood Collection Committee
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="zakat-board.html">Zakat Board</a>
                        </li>
                        <li className="nav-item">
                          <a href="employee-list.html">Employee List</a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <a
                        className="page-scroll dd-menu collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#submenu-1-3"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        Thalassaemia
                      </a>
                      <ul className="sub-menu collapse" id="submenu-1-3">
                        <li className="nav-item">
                          <a href="thalassaemia.html">What is thalassaemia</a>
                        </li>
                        <li className="nav-item">
                          <a href="treatment.html">Treatment</a>
                        </li>
                        <li className="nav-item">
                          <a href="prevention.html">Prevention</a>
                        </li>
                        <li className="nav-item">
                          <a href="awareness.html">Awareness</a>
                        </li>
                      </ul>
                    </li>

                    {/* Additional Nav Items */}
                    {/* You can add more as needed */}
                  </ul>

                  <div className="zakat_button add-list-buttons">
                    <a href="donate-zakat.html" className="btn">
                      DONATE ZAKAT
                    </a>
                  </div>

                  <div className="button donate-button">
                    <a href="donate.html" className="btn">
                      DONATE NOW
                    </a>
                    <div className="hover-links">
                      <ul className="donate-menu">
                        <li className="dnt-item">
                          <a href="donate-blood.html">Blood Donation</a>
                        </li>
                        <li className="dnt-item">
                          <a href="sponsor-child.html">Sponsor a Child</a>
                        </li>
                        <li className="dnt-item">
                          <a href="general-donate.html">Financial Donation</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link to="/login" className="btn">
                    <img
                      src="client/assets/images/icon/user.png"
                      className="card-img-top"
                      style={{ width: '35px' }}
                      alt="profile"
                    />
                  </Link>
                </div>
              </nav>
              {/* End Navbar */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
