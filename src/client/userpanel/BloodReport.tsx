import { Droplet } from "lucide-react";

const BloodReport = () => {
  return (
    <div>
       <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-transparent to-red-300 opacity-10 pointer-events-none"></div>
      <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
        <Droplet className="me-2" size={30} />Blood Report
      </h5>
      <p className="text-gray-500 mt-2">
        Welcome back to your personalized dashboard.
      </p>

      <div
        className="table-responsive mt-4"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <table
          className="table table-bordered table-hover table-sm mb-0"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead className="bg-light">
            <tr>
              <th scope="col" className="text-center" style={{ width: "10%" }}>
                #SN
              </th>
              <th scope="col">Donation Title</th>
              <th scope="col" className="text-center" style={{ width: "20%" }}>
                Donation Date
              </th>
              <th scope="col" className="text-center" style={{ width: "25%" }}>
                Location
              </th>
              <th scope="col" className="text-center" style={{ width: "15%" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">{index + 1}</td>
                  <td className="align-middle">
                    Blood Donation {index + 1}
                  </td>
                  <td className="text-center align-middle">
                    2024-10-22
                  </td>
                  <td className="text-center align-middle">
                    Dhaka Medical College
                  </td>
                  <td className="text-center py-3 align-middle">
                    <span className={`badge ${index % 2 === 0 ? 'bg-success' : 'bg-warning'}`}>
                      {index % 2 === 0 ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodReport;
