import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchPublicGallery } from "@/redux/slices/publicSlice";

const VideoGallery = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { galleries, isLoading, isError, error } = useSelector(
        (state: RootState) => state.public
    );

    useEffect(() => {
        dispatch(fetchPublicGallery({ type: "video" })); // Fetch sliders on mount
    }, [dispatch]);

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state
    }

    if (isError) {
        return <p>Error: {error}</p>; // Show error message if any
    }

    const galleriesData = Array.isArray(galleries.data) ? galleries.data : [];

    return (
        <section id="video-gallery" className="videos-gallery section">


            <div className="">
                <div className="col-12">
                    <div className="section-title">
                        <h2 className="wow fadeInUp" data-wow-delay=".5s">.</h2>
                    </div>
                </div>
            </div>


            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title align-center gray-bg">
                            <h2 className="wow fadeInUp" data-wow-delay=".4s">
                                Video Gallery
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {galleriesData.map((video, index) => (
                        <div key={index} className="col-md-6 col-lg-6 mt-4 mb-3">
                            <iframe
                                width="100%"
                                height="255px"
                                src={video.video_url}
                                title={video.type || "Video"}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default VideoGallery;