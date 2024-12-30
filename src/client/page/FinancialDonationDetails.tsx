import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchSingleFinancialDonation,
  fetchFinancialDonation,
} from "@/redux/slices/publicSlice";
import { Link } from "react-router-dom";

const SingleDonation = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { singleFinancialdonation, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public
  );

  const { financialdonations } = useSelector(
    (state: RootState) => state.public
  );

  useEffect(() => {
    dispatch(fetchFinancialDonation({}));
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleFinancialDonation(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center my-5">Loading...</p>;
  if (isError)
    return <p className="text-danger text-center my-5">Error: {error}</p>;
  if (!singleFinancialdonation)
    return <p className="text-center my-5">No data found.</p>;

  const donations = Array.isArray(financialdonations?.data)
    ? financialdonations.data
    : [];

  return (
    <>
      <section className="financial-donation mt-14 section">
        <div className="container">
          <div className="content">
            <div className="row">
              <div className="col-lg-7 col-md-7 col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="post-thumbnils">
                            <img
                                src={singleFinancialdonation.image}
                                alt={singleFinancialdonation.title}
                                className="rounded"
                            />
                        </div>
                        <div className="details-content">
                        <h5
                        className="card-title mt-3 text-start"
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "red",
                        }}
                      >
                       {singleFinancialdonation.title}
                      </h5>

                    
                        <p className="mt-2" dangerouslySetInnerHTML={{ __html: singleFinancialdonation.description }} />

                        </div>
                    </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-5 col-12 order-2">
                <div className="financial-form card shadow-lg border-0">
                  <div className="card-body p-5">
                    <form>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Country</option>
                          <option value={1}>Bangladesh</option>
                          <option value={2}>India</option>
                          <option value={3}>Japan</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Currency</option>
                          <option value={1}>USD</option>
                          <option value={2}>BDT</option>
                          <option value={3}>AUD</option>
                        </select>
                      </div>
                      <div className="row">

                        <div className="col-lg-12 col-md-12 mb-3">
                          <div className="custom-ammount">
                            <input
                              type="text"
                              placeholder="৳ Custom"
                              className="form-control"
                              id="customInput"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Name"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="email"
                          placeholder="Enter Mail"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Phone Number"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div className="mb-3">
                        <select className="form-select">
                          <option selected>District</option>
                          <option value={1}>Comilla</option>
                          <option value={2}>Sirajganj</option>
                          <option value={3}>Lalmonirhat</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Thana</option>
                          <option value={1}>Comilla</option>
                          <option value={2}>Sirajganj</option>
                          <option value={3}>Lalmonirhat</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Address"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="button add-list-button d-flex justify-content-center align-items-center">
                        <a href="#" className="btn">
                          DONATE NOW
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More donations section */}

      <section className="event-section other-donation ">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".5s">
                More Donations
              </h2>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="content">
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
        </div>
      </section>
    </>
  );
};

export default SingleDonation;
