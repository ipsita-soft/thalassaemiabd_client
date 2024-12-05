import { User, Camera } from "lucide-react";
import { useState } from "react";

const UpdateProfile = () => {
  const [activeTab] = useState("update-profile");

  console.log(activeTab);
  
  const [profileData, setProfileData] = useState({
    name: "Apurbo Ray",
    email: "johndoe@email.com",
    phone: "+1 234 567 890",
    address: "1234 Elm Street, NY, USA",
    about:
      "Passionate software engineer with 5+ years of experience in building modern web applications.",
  });

  const [image, setImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Profile Data:", profileData);
  };

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-transparent to-red-300 opacity-10 pointer-events-none"></div>
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
              rows={4}
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
  );
};

export default UpdateProfile;
