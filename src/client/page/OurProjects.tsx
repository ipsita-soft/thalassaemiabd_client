import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust import path if necessary
import { fetchPublicOurProjects } from "@/redux/slices/publicSlice";
import { useEffect } from 'react';

const OurProjects = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { project, isLoading, isError, error } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        dispatch(fetchPublicOurProjects({})); // Fetch events on component mount
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error: {error}</p>;

    const projects = Array.isArray(project?.data) ? project.data : [];

    console.log(projects);

    return (
        <div className="our-projects section mt-14">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h2 className="wow fadeInUp" data-wow-delay=".7s">
                                Our Projects
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="single-news wow fadeInUp" data-wow-delay=".2s">
                            <div className="row">
                                {projects.map((data) => (
                                    <div key={data.id} className="col-lg-4 col-md-4 col-12 mb-4">
                                        <a href={`project-details/${data.id}`}>
                                            <div className="card shadow-sm">
                                                <img src={data.image || "assets/images/projects/default.jpg"} className="card-img-top" alt={data.title || "Project Image"} />
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
                        {/* End Single News */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurProjects;
