import {FileText} from "lucide-react";

const AnnualReports = () => {
  return (
    <div>
       <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-transparent to-red-300 opacity-10 pointer-events-none"></div>
      <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
          <FileText className="me-2" size={30} />  Annual Reports
      </h5>
      <p className="text-gray-500 mt-2"> Welcome back to your personalized dashboard. </p>

      <div className="table-responsive mt-4" style={{ maxHeight: "300px", overflowY: "auto" }}>
          <table className="table table-bordered table-hover table-sm mb-0" style={{ tableLayout: "fixed", width: "100%" }}>
              <thead className="bg-light">
              <tr>
                  <th scope="col" className="text-center" style={{ width: '10%' }}>#SN</th>
                  <th scope="col">Annual Report Title</th>
                  <th scope="col" className="text-center" style={{ width: '20%' }}>Date</th>
                  <th scope="col" className="text-center" style={{ width: '15%' }}>Download</th>
              </tr>
              </thead>
              <tbody>
              {Array(10).fill(null).map((_, index) => (
                  <tr key={index}>
                  <td className="text-center align-middle">{index + 1}</td>
                  <td className="align-middle">Latest Notice {index + 1}</td>
                  <td className="text-center align-middle">2024-10-22</td>
                  <td className="text-center">
                      <a
                      href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm text-xs my-2 btn-outline-danger"
                      >
                      Download
                      </a>
                  </td>
                  </tr>
              ))}
              </tbody>
          </table>
      </div>

    </div>
  );
};

export default AnnualReports;
