import { useEffect } from "react";
import "glightbox/dist/css/glightbox.min.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchLink } from "@/redux/slices/publicSlice";

const RelatedLinks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { link } = useSelector((state: RootState) => state.public);

  useEffect(() => {
    console.log("Redux State - link data:", link);
  }, [link]);

  useEffect(() => {
    dispatch(fetchLink({}));
  }, [dispatch]);

  return (
    <section className="about-us section mt-14">
      <div className="employee-list">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <div className="section-title">
                <h2 className="wow fadeInUp" data-wow-delay=".7s">
                  Related Links
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card p-4 shadow-sm">
                <div className="table-responsive">
                  <table className="table table-bordered text-center align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col">SL No</th>
                        <th scope="col">Logo</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {link?.length > 0 ? (
                        link.map((item, index) => (
                          <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <a
                                href={item.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={item.image || "/default-image.png"}
                                  alt={item.title || "No Logo"}
                                  className="img-fluid"
                                  style={{
                                    width: "80px",
                                    height: "40px",
                                   
                                  }}
                                />
                              </a>
                            </td>
                            <td>{item.title || "N/A"}</td>
                            <td>{item.description || "No description available."}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center text-muted">
                            No related links available.
                          </td>
                        </tr>
                      )}
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

export default RelatedLinks;
