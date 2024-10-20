import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 p-8">
      <div className="container mx-auto mb-5">

        {/* Header Section */}
        <div className="rounded-lg p-6 mt-20 mb-10">
          <h2 className="text-4xl font-extrabold text-blue-600">Hello, Apurbo!</h2>
          <p className="text-gray-500 mt-2">Welcome back to your personalized dashboard.</p>
        </div>

        {/* Grid Layout for Notices and Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Notices Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Latest Notices</h3>
            <ul className="space-y-4">
              <li className="bg-indigo-50 p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-indigo-800">System Maintenance</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Maintenance scheduled on Oct 25th from 2:00 AM to 4:00 AM.
                </p>
              </li>
              <li className="bg-indigo-50 p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-indigo-800">New Features Added</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Explore the new profile section with improved navigation!
                </p>
              </li>
            </ul>
          </div>

          {/* Personal Profile Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl">
            <div className="flex items-center mb-6">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="rounded-full border-4 border-green-500"
              />
              <div className="ml-4">
                <h4 className="text-xl font-bold text-green-700">Apurbo</h4>
                <p className="text-gray-600">apurbo@example.com</p>
                <p className="text-sm text-gray-500">Role: Admin</p>
              </div>
            </div>
            <button className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
              Update Profile
            </button>
          </div>

        </div>

        {/* Profile Update Form */}
        <div className="mt-12">
          <div className="bg-white shadow-lg rounded-lg p-8 transition hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-purple-600 mb-6">Edit Your Profile</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter a new password"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
