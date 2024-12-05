import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSetting } from '@/redux/slices/publicSlice'; // Import the thunk

const Header = () => {

  const dispatch = useDispatch<AppDispatch>();

  // Access setting data from Redux state
  const { setting } = useSelector((state: RootState) => state.public);

  useEffect(() => {
    // Fetch settings without checking for id
    dispatch(fetchSetting({}));
  }, [dispatch]);


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
                <Link className="navbar-brand" to="/">
                  <img src={setting?.headerlogo} alt="Logo" />
                </Link>

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
                      <Link
                        className="page-scroll active dd-menu collapsed"
                        to="/"
                        data-bs-toggle="collapse"
                        data-bs-target="#submenu-1-1"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        Home
                      </Link>
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
                          <Link to="bts-history">BTS History</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="mission-vision">Vision & Mission</Link>
                        </li>
                        <li className="nav-item">

                          <Link to={`/page/tif_member`}>TIF Membership</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="our-projects">Our Projects</Link>
                        </li>



                        <li className="nav-item">
                          <Link to="founder">Founder</Link>
                        </li>


                        <li className="nav-item">
                          <Link to="ec-committee">Executive Committee</Link>
                        </li>


                        <li className="nav-item">
                          <Link to="advisors">Advisors</Link>
                        </li>

                        <li className="nav-item">

                          <Link to="blood-collection-committee">   Blood Collection Committee</Link>

                        </li>
                        <li className="nav-item">
                          <Link to="zakat-board">Zakat Board</Link>
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
                          <Link to="thalassaemia">What is thalassaemia</Link>
                        </li>
                        <li className="nav-item">
                          <a href="treatment.html">Treatment</a>
                        </li>
                        <li className="nav-item">
                          <a href="/">Prevention</a>
                        </li>
                        <li className="nav-item">
                          <Link to={`/page/awareness`}>Awareness</Link>
                        </li>
                      </ul>
                    </li>



                    <li className="nav-item">
                      <a className="page-scroll dd-menu collapsed" href="#" data-bs-toggle="collapse"
                        data-bs-target="#submenu-1-3" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">Media</a>
                      <ul className="sub-menu collapse" id="submenu-1-3">
                        <li className="nav-item"><Link to="events-all">Events</Link></li>
                        <li className="nav-item"><Link to="photo-gallery">Photos</Link></li>
                        <li className="nav-item"><Link to="videos-gallery">Videos</Link></li>
                        <li className="nav-item"><Link to="publications">Publications</Link></li>
                        <li className="nav-item"><Link to="blog-news-all">Blogs & News</Link></li>
                        <li className="nav-item"><Link to="story-all">Story</Link></li>
                        <li className="nav-item">
                          <Link to={`/page/advertisements`}>Advertisements</Link>
                        </li>
                      </ul>
                    </li>


                    <li className="nav-item">
                      <Link to="notice">Notice</Link>

                    </li>

                    {/* Additional Nav Items */}
                    {/* You can add more as needed */}
                  </ul>

                  {/* <div className="zakat_button add-list-buttons">
                    <a href="donate-zakat.html" className="btn">
                      DONATE ZAKAT
                    </a>
                  </div> */}

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




                  <div className="user-button">

                    <div className="zakat_button add-list-buttons ml-2">
                      <a href="donate-zakat.html" className="btn">
                        Registrations
                      </a>
                    </div>

                    <div className="user-links">
                      <ul className="donate-menu">
                        <li className="dnt-item"><Link to="blood-donor-registration">Blood Donor Registration</Link></li>
                        <li className="dnt-item">
                          <Link to="/patient-registration">Patient Registration</Link>
                        </li>
                        <li className="dnt-item"><a href="financial-donor-reg.html">Financial Donor Registration</a></li>
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
