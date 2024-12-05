import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSetting } from '@/redux/slices/publicSlice'; // Import the thunk


const PanelFooter = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { setting } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        // Fetch settings without checking for id
        dispatch(fetchSetting({}));
    }, [dispatch]);




    return (
        <footer className="footer overlay">
           
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

            <a href={`https://wa.me/${setting?.whatsapp}`} target="_blank" className="scroll-top2">
                <i className="lni lni-whatsapp"></i>
            </a>

            {/* Scroll to Top */}
            <a href="#" className="scroll-top">
                <i className="lni lni-chevron-up"></i>
            </a>




        </footer>
    );
};

export default PanelFooter;
