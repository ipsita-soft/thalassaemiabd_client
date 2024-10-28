import React from "react";
import { Droplet, Stethoscope, Syringe, Calendar, MapPin } from "lucide-react";

const HealthHistory = () => {
  const data = [
    { type: "Medical Appointment", date: "2024-09-15", location: "Apollo Hospital", status: "Completed" },
    { type: "Prescription Issued", date: "2024-08-30", location: "Green Life Hospital", status: "Pending" },
    { type: "Vaccination", date: "2024-07-21", location: "Dhaka Medical", status: "Completed" },
    { type: "Health Checkup", date: "2024-06-18", location: "Square Hospital", status: "Completed" },
  ];

  return (
    <div>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-transparent to-red-300 opacity-10 pointer-events-none"></div>

      {/* Page Header */}
      <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
        <Stethoscope className="me-2" size={30} /> Health History
      </h5>
      <p className="text-gray-500 mt-2">
        Keep track of your medical appointments, prescriptions, vaccinations, and more.
      </p>

      {/* Health Records Table */}
      <div
        className="table-responsive mt-4 "
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <table
          className="table table-bordered table-hover table-sm mb-0"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead className="bg-light">
            <tr>
              <th scope="col" className="text-center" style={{ width: "10%" }}>#SN</th>
              <th scope="col">Record Type</th>
              <th scope="col" className="text-center" style={{ width: "20%" }}>Date</th>
              <th scope="col" className="text-center" style={{ width: "25%" }}>Location</th>
              <th scope="col" className="text-center" style={{ width: "15%" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="text-center align-middle">{index + 1}</td>

                <td className=" align-middle">
                  {item.type}
                </td>

                <td className="text-center align-middle">
                  {item.date}
                </td>
                <td className="text-center align-middle">
                  {item.location}
                </td>
                <td className="text-center py-3 align-middle">
                  <span
                    className={`badge px-3 py-2 text-white ${
                      item.status === "Completed" ? "bg-success" : "bg-warning"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Health Tips Section */}
      <div className="mt-4 p-3 bg-light rounded border">
        <h6 className="font-semibold text-dark">Health Tips</h6>
        <ul className="mt-2 text-muted">
          <li>Stay hydrated and drink at least 8 glasses of water daily.</li>
          <li>Get regular health checkups to stay ahead of any potential issues.</li>
          <li>Maintain a balanced diet with plenty of fruits and vegetables.</li>
        </ul>
      </div>
    </div>
  );
};

export default HealthHistory;
