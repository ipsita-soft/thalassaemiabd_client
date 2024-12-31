const employees = [
    {
      id: 1,
      image: "",
      name: "Dr. A K M Ekramul Hossain",
      designation: "Executive Director",
      contact: "01xxxxxxxxx"
    },
    {
      id: 2,
      image: "",
      name: "Dr. Ferdousi Ara",
      designation: "Consultant",
      contact: "01xxxxxxxxx"
    },
    {
      id: 3,
      image: "",
      name: "Dr. Md. Kabirul Islam",
      designation: "Chief Medical Officer",
      contact: "01xxxxxxxxx"
    },
    // Add more employee data here
  ];
  
  // Online default image URL
  const defaultImage = "https://www.new.thalassaemiabd.org/assets/images/employee/women.jpg";
  
  const EmployeeList = () => {
    return (
      <section className="about-us section mt-14">
        <div className="employee-list">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h2 className="wow fadeInUp" data-wow-delay=".7s">
                    Employee List
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card p-4  table-responsive-sm">
                  <div className="table-responsive">
                    <table
                      id="example"
                      className="table table-bordered text-center"
                      style={{ width: '100%' }}
                    >
                      <thead className="text-center">
                        <tr>
                          <th scope="col">SL No</th>
                          <th scope="col">Image</th>
                          <th scope="col">Name</th>
                          <th scope="col">Designation</th>
                          <th scope="col">Contact No.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee, index) => (
                          <tr key={employee.id}>
                            <th scope="row" className="em-list">
                              {index + 1}
                            </th>
                            <td>
                              <img
                                className="img-fluid"
                                src={employee.image || defaultImage} // Fallback to online default image
                                alt={employee.name}
                              />
                            </td>
                            <td className="em-list">{employee.name}</td>
                            <td className="em-list">{employee.designation}</td>
                            <td className="em-list">{employee.contact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default EmployeeList;
  