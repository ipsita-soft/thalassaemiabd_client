import React from 'react';
import 'glightbox/dist/css/glightbox.css'; // Import glightbox styles
import GLightbox from 'glightbox'; // Import glightbox
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchBtsHistory } from '@/redux/slices/publicSlice'; // Import the thunk

const BtsHistory = () => {


    const dispatch = useDispatch<AppDispatch>();

    // Access setting data from Redux state
    const { btsHistory } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        // Fetch settings without checking for id
        dispatch(fetchBtsHistory({}));
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
                                <img src={btsHistory?.mimage} alt="mimage" />
                                {/* <a href="https://www.youtube.com/embed/ir72Qf-x6rQ" className="glightbox video">
                                    <i className="lni lni-play"></i>
                                </a> */}
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-12 col-12">
                            <div className="content-right wow fadeInRight" data-wow-delay=".5s">
                                <h2>{btsHistory?.mtitle}</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: btsHistory?.mdescription ? btsHistory.mdescription : '',
                                    }}
                                />
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
                                <h2>   {btsHistory?.vtitle}</h2>

                                <div className="row">
                                    <div className="col-lg-12 col-12">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: btsHistory?.vdescription ? btsHistory.vdescription : '',
                                            }}
                                        />
                                    </div>
                                </div>



                            </div>
                        </div>

                        <div className="col-lg-5 col-md-4 col-12">
                            <div className="content-thalass wow fadeInRight" data-wow-delay=".3s">
                                <img className="img-fluid" src={btsHistory?.vimage} alt="vimage" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>




        </>
    );
};

export default BtsHistory;
