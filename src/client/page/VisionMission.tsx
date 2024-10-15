import React from 'react';
import 'glightbox/dist/css/glightbox.css'; // Import glightbox styles
import GLightbox from 'glightbox'; // Import glightbox
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchMissionVision } from '@/redux/slices/publicSlice'; // Import the thunk

const VisionMission = () => {


    const dispatch = useDispatch<AppDispatch>();

    // Access setting data from Redux state
    const { missionVision } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        // Fetch settings without checking for id
        dispatch(fetchMissionVision({}));
    }, [dispatch]);


    // Initialize glightbox
    React.useEffect(() => {
        GLightbox({
            selector: '.glightbox',
        });
    }, []);

    return (
        <>
            {/* Vision Section */}
            <section className="vision section mt-14">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-12 col-12">
                            <div className="content-left wow fadeInLeft" data-wow-delay=".3s">
                                <img src={missionVision?.vision_image} alt="Vision" />
                                {/* <a href="https://www.youtube.com/embed/ir72Qf-x6rQ" className="glightbox video">
                                    <i className="lni lni-play"></i>
                                </a> */}
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-12 col-12">
                            <div className="content-right wow fadeInRight" data-wow-delay=".5s">
                                <h2>Our Vision</h2>
                                <p>
                                    {missionVision?.vision_description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-8 col-12 wow fadeInLeft" data-wow-delay=".3s">
                            <div className="content-thalass">
                                <h2>Our Mission</h2>
                                <p>
                                    To ensure quality patient management and eradicate Thalassaemia from our beloved country,
                                    Bangladesh. To achieve this vision, we have set the following objectives:
                                </p>
                                <div className="row">
                                    <div className="col-lg-12 col-12">
                                        {missionVision?.mission_description}
                                        {/* <ul className="list">
                                            <li><i className="lni lni-checkbox"></i>Ensure availability of the best tools and techniques for treatment.</li>
                                            <li><i className="lni lni-checkbox"></i>Reduce the prevalence of the Thalassaemia gene in society.</li>
                                            <li><i className="lni lni-checkbox"></i>Encourage the government and official bodies to implement quality treatment protocols and prevention programs regarding Thalassaemia.</li>
                                            <li><i className="lni lni-checkbox"></i>Spread awareness about this genetic and dreadful disease, and provide free Thalassaemia tests and counseling.</li>
                                            <li><i className="lni lni-checkbox"></i>Ensure free treatment for needy Thalassaemia patients.</li>
                                            <li><i className="lni lni-checkbox"></i>Encourage people to donate blood voluntarily.</li>
                                            <li><i className="lni lni-checkbox"></i>Promote and assist Thalassaemia research in collaboration with national and international organizations.</li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5 col-md-4 col-12">
                            <div className="content-thalass wow fadeInRight" data-wow-delay=".3s">
                                <img className="img-fluid" src={missionVision?.mission_image} alt="Mission" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>




        </>
    );
};

export default VisionMission;
