import { fetchRoleWithUser } from "@/redux/slices/commonSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const defaultImage = "https://www.new.thalassaemiabd.org/assets/images/employee/women.jpg";

const EmployeeList = () => {

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchRoleWithUser({
      //stafe
      role_id: 10,
      per_page: 250,
      page: 1,
      search: 'all',
    }));

  }, [dispatch]);

  const { roleWithUser: employees } = useSelector((state: RootState) => state.commonData);

  console.log(employees);

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
                        <th scope="col">Contact No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee: any, index) => (
                        <tr key={index + 1}>
                          <th scope="row" className="em-list">
                            {index + 1}
                          </th>
                          <td>
                            <img
                              className="img-fluid"
                              src={employee?.profile_image || defaultImage}
                              alt={employee?.profile_image}
                            />
                          </td>
                          <td className="em-list">{employee.name}</td>
                          <td className="em-list">{employee.phone}</td>
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
