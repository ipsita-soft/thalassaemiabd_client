import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSetting } from '@/redux/slices/publicSlice'; // Import the thunk

const Footer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { setting } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        // Fetch settings without checking for id
        dispatch(fetchSetting({}));
    }, [dispatch]);




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
                                            <li><a href="about-us.html">About BTS</a></li>
                                            <li><a href="mission&vision.html">Mission & Vision</a></li>
                                            <li><a href="javascript:void(0)">Donate Blood</a></li>
                                            <li><a href="javascript:void(0)">Donate Zakat</a></li>
                                            <li><a href="javascript:void(0)">Sponsor a Child</a></li>
                                            <li><a href="javascript:void(0)">Patient Management</a></li>
                                            <li><a href="javascript:void(0)">Prevention</a></li>
                                            <li><a href="javascript:void(0)">EC Committee</a></li>
                                            <li><a href="javascript:void(0)">Zakat Board</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <ul>
                                            <li><a href="Committee.html">Publications</a></li>
                                            <li><a href="javascript:void(0)">TIF</a></li>
                                            <li><a href="javascript:void(0)">Appointment</a></li>
                                            <li><a href="javascript:void(0)">Notices</a></li>
                                            <li><a href="javascript:void(0)">Events</a></li>
                                            <li><a href="javascript:void(0)">Blood Booking</a></li>
                                            <li><a href="contact.html">Employee List</a></li>
                                            <li><a href="javascript:void(0)">Buy Medicine</a></li>
                                            <li><a href="javascript:void(0)">Gallery</a></li>
                                            <li><a href="contact.html">Contact Us</a></li>
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
                                    <li><a href="javascript:void(0)">Terms & Conditions</a></li>
                                    <li><a href="faq.html">FAQ</a></li>
                                    <li><a href="javascript:void(0)">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Footer Bottom */}

            {/* Scroll to Top */}
            <a href="#" className="scroll-top">
                <i className="lni lni-chevron-up"></i>
            </a>
        </footer>
    );
};

export default Footer;
