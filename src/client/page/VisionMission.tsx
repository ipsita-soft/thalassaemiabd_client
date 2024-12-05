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

                            </div>
                        </div>

                        <div className="col-lg-7 col-md-12 col-12">
                            <div className="content-right wow fadeInRight" data-wow-delay=".5s">
                                <h2>Our Vision</h2>
                                <p
                                    className="card-text"
                                    dangerouslySetInnerHTML={{
                                        __html: missionVision?.vision_description || '',
                                    }}
                                ></p>

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
                                        <p
                                            className="card-text"
                                            dangerouslySetInnerHTML={{
                                                __html: missionVision?.mission_description || '',
                                            }}
                                        ></p>
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
