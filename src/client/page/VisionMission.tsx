import { useEffect } from 'react';
import 'glightbox/dist/css/glightbox.css';
import GLightbox from 'glightbox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; 
import { fetchMissionVision } from '@/redux/slices/publicSlice';

const VisionMission = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { missionVision } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        dispatch(fetchMissionVision({}));
    }, [dispatch]);

    useEffect(() => {
        const lightbox = GLightbox({
            selector: '.glightbox',
        });
        return () => lightbox.destroy();
    }, []);

    if (!missionVision) return null;

    const descriptionParts = missionVision.vision_description.split("</p>");

    return (
        <section className="single-event-section mt-14">
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="card shadow-lg border-0">
                            <div className="row g-0">
                                {/* Image Section */}
                                <div className="col-md-6 col-12">
                                    {!missionVision?.vision_image ? (
                                        <div className="placeholder-image" style={{ height: '500px', backgroundColor: '#f0f0f0' }}></div>
                                    ) : (
                                        <img
                                            src={missionVision?.vision_image}
                                            alt={"Mission & Vision"}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                            style={{ maxHeight: "500px" }}
                                        />
                                    )}
                                </div>

                                {/* Side Description Section */}
                                <div className="col-md-6 col-12 p-4 d-flex flex-column justify-content-between">
                                    <div>
                                        <h1 className="fw-bold text-success mb-2"> Mission & Vision </h1>
                                        {descriptionParts.slice(0, 10).map((part, index) => (
                                            <div key={index} className="text-secondary" dangerouslySetInnerHTML={{ __html: part || "" }}></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Description Section */}
                                <div className="col-12 p-4">
                                    <div
                                        className="text-dark"
                                        dangerouslySetInnerHTML={{
                                            __html: descriptionParts.slice(10).join("</p>") || "",
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
