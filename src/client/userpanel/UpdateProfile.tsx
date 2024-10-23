import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, FileText, Bell, User, Edit, LogOut, Camera } from "lucide-react";

const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState("update-profile");

  // State for user profile data
  const [profileData, setProfileData] = useState({
    name: "Apurbo Ray",
    email: "johndoe@email.com",
    phone: "+1 234 567 890",
    address: "1234 Elm Street, NY, USA",
    about:
      "Passionate software engineer with 5+ years of experience in building modern web applications.",
  });

  const [image, setImage] = useState(null); // State for storing the uploaded image

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", profileData);
    // You can make an API call here to save the updated profile data
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
        <div className="row mt-5 pt-4 gy-4 d-flex h-100 align-items-stretch">
          {/* Sidebar Section */}
          <div className="col-md-3 d-flex flex-column" style={{ height: "80vh" }}>
            <div
              className="sidebar bg-white p-4 shadow-lg rounded d-flex flex-column"
              style={{ flex: "1 1 auto", overflowY: "auto" }}
            >
              <ul className="nav flex-column mb-auto">
                <li className="nav-item mb-3">
                  <Link
                    to="/userpanel"
                    className={`d-flex align-items-center ${getLinkClasses("dashboard")}`}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <Home className="me-2" size={20} />
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item mb-3">
                  <Link
                    to="/userpanel/notices"
                    className={`d-flex align-items-center ${getLinkClasses("notices")}`}
                    onClick={() => setActiveTab("notices")}
                  >
                    <Bell className="me-2" size={20} />
                    Notices
                  </Link>
                </li>

                <li className="nav-item mb-3">
                  <Link
                    to="/userpanel/annual-reports"
                    className={`d-flex align-items-center ${getLinkClasses("annual-reports")}`}
                    onClick={() => setActiveTab("annual-reports")}
                  >
                    <FileText className="me-2" size={20} />
                    Annual Reports
                  </Link>
                </li>

                <li className="nav-item mb-3">
                  <Link
                    to="/userpanel/my-profile"
                    className={`d-flex align-items-center ${getLinkClasses("profile")}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="me-2" size={20} />
                    My Profile
                  </Link>
                </li>

                <li className="nav-item mb-3">
                  <Link
                    to="/userpanel/update-profile"
                    className={`d-flex align-items-center ${getLinkClasses("update-profile")}`}
                    onClick={() => setActiveTab("update-profile")}
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
                <User className="me-2" size={30} /> Update Profile
              </h5>
              <p className="text-gray-500 mt-2">
                Welcome back to your personalized dashboard.
              </p>

              {/* Profile Update Form */}
              <form onSubmit={handleSubmit} className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Image Upload */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                        {image ? (
                          <img
                            src={image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="w-full h-full text-gray-300 p-4" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      About Me
                    </label>
                    <textarea
                      name="about"
                      value={profileData.about}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    ></textarea>
                  </div>
                </div>
                <div className="text-center mb-3">
                <button
                  type="submit"
                  className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                >
                  Save Changes
                </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
