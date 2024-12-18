import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSetting } from '@/redux/slices/publicSlice'; // Import the thunk
import Marquee from "react-marquee-slider";
import { Link } from 'react-router-dom';

const Footer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { setting } = useSelector((state: RootState) => state.public);
    const [isMarqueeVisible, setMarqueeVisible] = useState(true);
    useEffect(() => {
        // Fetch settings without checking for id
        dispatch(fetchSetting({}));
    }, [dispatch]);

    const handleCloseClick = () => {
        setMarqueeVisible(!isMarqueeVisible);
    };



    return (
        <footer className="footer overlay">
            {/* Start Footer Middle */}
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            {/* Single Widget */}
                            <div className="single-footer f-about">
                                <div className="logo">
                                    <a href="index.html">
                                        <img src={setting?.footerlogo} alt="Logo" />
                                    </a>
                                </div>
                                <p>
                                    {setting?.slogan}
                                </p>
                                <ul className="social">
                                    <li><a href={setting?.facebook}><i className="lni lni-facebook-filled"></i></a></li>
                                    <li><a href={setting?.twitter}><i className="lni lni-twitter-original"></i></a></li>
                                    <li><a href={setting?.instagram}><i className="lni lni-instagram"></i></a></li>
                                    <li><a href={setting?.linkedin}><i className="lni lni-linkedin-original"></i></a></li>
                                    <li><a href={setting?.youtube}><i className="lni lni-youtube"></i></a></li>
                                </ul>
                            </div>
                            {/* End Single Widget */}
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            {/* Single Widget */}
                            <div className="single-footer f-link">
                                <h3>Important Links</h3>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <ul>
                                            <li><Link to="bts-history">About BTS</Link></li>
                                            <li><Link to="mission-vision">Mission & Vision</Link></li>
                                            <li><Link to="/page/tif_member">TIF Membership</Link></li>
                                            <li><Link to="our-projects">our Projects</Link></li>
                                            <li><Link to="founder">Founder</Link></li>
                                            <li><Link to="ec-committee">Executive Committee</Link></li>
                                            <li><Link to="zakat-board">Zakat Board</Link></li>
                                           
                                           
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <ul>
                                        <li><Link to="/page/awareness">Awareness</Link></li>
                                        <li><Link to="events-all">Events</Link></li>
                                        <li><Link to="photo-gallery">Photos</Link></li>
                                        <li><Link to="videos-gallery">Videos</Link></li>
                                        <li><Link to="publications">Publications</Link></li>
                                        <li><Link to="blog-news-all">Blogs & News</Link></li>
                                         
                                         
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* End Single Widget */}
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            {/* Single Widget */}
                            <div className="single-footer opening-hours">
                                <h3>About Us</h3>
                                <ul>
                                    <li>
                                        <span className="time">
                                            Bangladesh Thalassaemia Hospital, a non-profitable voluntary organization,
                                            serving Thalassaemia patients since 1989, managed by the Thalassaemia patients
                                            and parents only.
                                        </span>
                                    </li>
                                    <li>
                                        <span className="time">
                                            Social Welfare Department Registration: Dha-03110 (Date: 19.05.1994)
                                            NGO Affairs BUREAU: Registration No. 1159 (Date: 09.06.2017 to 08.06.2027)
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            {/* End Single Widget */}
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            {/* Single Widget */}
                            <div className="single-footer last f-contact">
                                <h3>Contact</h3>
                                <ul>
                                    <li><i className="lni lni-map-marker"></i>{setting?.location}
                                    </li>
                                    <li><i className="lni lni-phone"></i>{setting?.phone}</li>
                                    <li><i className="lni lni-envelope"></i> {setting?.email}</li>
                                </ul>

                                <ul className="finan">
                                    <div className='row'>
                                        <h4 className="accept">We Accept</h4>
                                        <img className="img-fluid" src="client/assets/images/financial/bkash.jpg" alt="bkash" />
                                        <img className="img-fluid" src="client/assets/images/financial/nagad.jpg" alt="nagad" />
                                        <img className="img-fluid" src="client/assets/images/financial/rocket.jpg" alt="rocket" />
                                        <img className="img-fluid" src="client/assets/images/financial/mastercard.jpg" alt="mastercard" />
                                        <img className="img-fluid" src="client/assets/images/financial/visa.jpg" alt="visa" />
                                        <img className="img-fluid" src="client/assets/images/financial/dbbl.jpg" alt="dbbl" />
                                    </div>
                                </ul>
                            </div>
                            {/* End Single Widget */}
                        </div>
                    </div>
                </div>
            </div>
            {/* End Footer Middle */}

            {/* Start Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="inner">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="content">
                                    <p className="copyright-text">Designed and Developed by
                                        <a href="https://www.ipsitasoft.com/" rel="nofollow" target="_blank">Ipsita Computers Pte Ltd.</a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <ul className="extra-link">
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Footer Bottom */}

            <a href={`https://wa.me/${setting?.whatsapp}`} target="_blank" className="scroll-top2">
                <i className="lni lni-whatsapp"></i>
            </a>

            {/* Scroll to Top */}
            <a href="#" className="scroll-top">
                <i className="lni lni-chevron-up"></i>
            </a>

            {/* <div className="onoffswitch3">
                <input type="checkbox" name="onoffswitch3" className="onoffswitch3-checkbox" id="myonoffswitch3" checked />
                <label className="onoffswitch3-label" htmlFor="myonoffswitch3">
                    <span className="onoffswitch3-inner">
                        {isMarqueeVisible ? (
                            <span className="onoffswitch3-active">
                                <Marquee
                                    velocity={50}
                                    direction="rtl"
                                    scatterRandomly={false}
                                    resetAfterTries={100}
                                    onInit={() => console.log("Marquee initialized")}
                                    onFinish={() => console.log("Marquee finished")}
                                >
                                    <div>{setting?.copyrighttext}</div>
                                    <div className='w-96'></div>
                                </Marquee>
                                <span className="onoffswitch3-switch">
                                Highlight <i className="lni lni-close" onClick={handleCloseClick}></i>
                                </span>
                            </span>
                        ) : (

                            <div>
                                <span className="onoffswitch3-inactive" style={{ backgroundColor: 'red', color: 'white' }}>
                                    <span className="onoffswitch3-switch  text-red-600 ml-4" style={{fontWeight:"bolder"}} onClick={handleCloseClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-newspaper" viewBox="0 0 16 16">
                                            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z" />
                                            <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z" />
                                        </svg>
                                       
                                    </span>
                                </span>
                            </div>

                        )}
                    </span>
                </label>
            </div> */}


        </footer>
    );
};

export default Footer;
