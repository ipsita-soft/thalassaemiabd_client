import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import { fetchFinancialDonation } from "@/redux/slices/publicSlice";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FinancialDonation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {financialdonations, isLoading, isError, error } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        dispatch(fetchFinancialDonation({}));
    }, [dispatch]);

    const location = useLocation();

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error: {error}</p>;

    const donations = Array.isArray(financialdonations?.data) ? financialdonations.data : [];

    return (
      <section id="financial" className={`financial other-donation ${location.pathname === '/financial-donations' ? 'mt-14 section' : 'pt-0 mt-0'}`}>
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2 className="wow fadeInUp" data-wow-delay=".2s">
                  Financial Donations
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                  <div className="single-news wow fadeInUp" data-wow-delay=".2s">
                      <div className="row">
                      {donations.map((donation: any) => (
                        <div className="col-lg-4 col-md-12 col-12" key={donation.id}>
                          <Link to={`/financial-donation-details/${donation.id}`}>                        
                            <div className="card">
                              <img
                                src={
                                  donation.image || "assets/images/financial/zakat2.jpg"
                                }
                                className="card-img-top img-fluid"
                                alt={donation.title}
                              />
                              <div className="card-body">
                                <h5
                                  className="card-title text-start"
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    color: "red",
                                  }}
                                >
                                  <Link to={`/financial-donation-details/${donation.id}`}>
                                    {donation.title}
                                  </Link>
                                </h5>

                                <p className="mt-2" dangerouslySetInnerHTML={{ __html: donation.description.substring(0, 200) }} />


                                <div className="donate_now text-center">
                                  <Link to={`/financial-donation-details/${donation.id}`}>
                                  Donate Now
                                  </Link>
                                
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                      </div>
                  </div>
                  {/* End Single News */}
              </div>
          </div>
        </div>
      </section>
    );
};

export default FinancialDonation;













