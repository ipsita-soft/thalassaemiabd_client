import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchSingleProject, fetchPublicOurProjects } from '@/redux/slices/publicSlice';
import './styles/SingleEvent.css';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { singleProject, project, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProject(id));
    }
    dispatch(fetchPublicOurProjects({}));
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-danger text-center">Error: {error}</p>;
  if (!singleProject) return <p className="text-center">No Project found.</p>;

  const descriptionParts = singleProject.description.split("</p>");
  const projects = Array.isArray(project?.data) ? project.data : [];

  return (
    <>
      {/* Project Details Section */}
      <section className="single-event-section mt-14">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0">
                <div className="row g-0">
                  {/* Image Section */}
                  <div className="col-md-6 col-12">
                    <img
                      src={singleProject.image || "placeholder.jpg"}
                      alt={singleProject.title || "Image"}
                      className="img-fluid w-100 h-100 object-fit-cover"
                      style={{ maxHeight: "500px" }}
                    />
                  </div>

                  {/* Side Description */}
                  <div className="col-md-6 col-12 p-4">
                    <h1 className="fw-bold text-success mb-2">
                      {singleProject.title || "No Title Available"}
                    </h1>
                    <div
                      dangerouslySetInnerHTML={{ __html: descriptionParts[0] || "" }}
                      className="text-secondary"
                    />
                  </div>

                  {/* Bottom Description */}
                  <div className="col-12 p-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: descriptionParts.slice(1).join("</p>") || "",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="our-projects section">
        <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".5s"> Related Projects</h2>
            </div>
          </div>
        </div>
        
          <div className="row">
            {projects.map((data) => (
                <div key={data.id} className="col-lg-4 col-md-4 col-12 mb-4">
                    <a href={`project-details/${data.id}`}>
                        <div className="card shadow-sm">
                            <div className="imgheight">
                                <img src={data.image || "assets/images/projects/default.jpg"} className="card-img-top" alt={data.title || "Project Image"} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href={`project-details/${data.id}`}>
                                        {data.title}
                                    </a>
                                </h5>
                                <p className="card-text">

                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data.description ? data.description.substring(0, 200) : '',
                                        }}
                                    />


                                </p>
                                <a className="text-end mt-2" href={`project-details/${data.id}`}>Read More</a>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetails;
