
const DonorPool = () => {
  return (
    <section className="donor-pool section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title align-center gray-bg">
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                Blood Management
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5 col-lg-5 col-12">
            <div className="row wow fadeInLeft" data-wow-delay=".3s">
              <div className="col-md-12 col-lg-12">
                <div className="donor_slide">
                  <div
                    id="carouselExampleCaptions"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src="client/assets/images/blood donation/d1.jpg"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src="client/assets/images/blood donation/d2.jpg"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src="client/assets/images/blood donation/d3.jpg"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 col-lg-12 mt-4 mb-3">
                <iframe
                  width="100%"
                  height="255px"
                  src="https://www.youtube.com/embed/ir72Qf-x6rQ"
                  title="About Thalassaemia"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-lg-7 col-12">
            <div className="row wow fadeInRight" data-wow-delay=".3s">
              <div className="col-lg-12 col-md-12">
                <div className="blood-availability text-center">
                  <h4>Blood Availability</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Group</th>
                          <th>Demand Today's</th>
                          <th>Collection</th>
                          <th>Booked</th>
                          <th>Stocks</th>
                          <th>Reservation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>A+</td>
                          <td>10</td>
                          <td>10</td>
                          <td>50</td>
                          <td>50</td>
                          <td className="book-now">
                            <a href="#">Book Now</a>
                          </td>
                        </tr>
                        <tr>
                          <td>O+</td>
                          <td>10</td>
                          <td>10</td>
                          <td>50</td>
                          <td>50</td>
                          <td className="book-now">
                            <a href="#">Book Now</a>
                          </td>
                        </tr>
                        <tr>
                          <td>B+</td>
                          <td>10</td>
                          <td>10</td>
                          <td>50</td>
                          <td>50</td>
                          <td className="book-now">
                            <a href="#">Book Now</a>
                          </td>
                        </tr>
                        <tr>
                          <td>AB+</td>
                          <td>10</td>
                          <td>10</td>
                          <td>50</td>
                          <td>50</td>
                          <td className="book-now">
                            <a href="#">Book Now</a>
                          </td>
                        </tr>
                        <tr>
                          <td>A-</td>
                          <td>10</td>
                          <td>10</td>
                          <td>50</td>
                          <td>50</td>
                          <td className="book-now">
                            <a href="#">Book Now</a>
                          </td>
                        </tr>
                        <tr>
                          <td>O-</td>
                          <td>10</td>
                          <td>10</td>
                          <td>50</td>
                          <td>50</td>
                          <td className="book-now">
                            <a href="#">Book Now</a>
                          </td>
                        </tr>
                        <tr>
                          <td>B-</td>
                          <td>10</td>
                          <td>10</td>
                          <td>50</td>
                          <td>50</td>
                          <td className="book-now">
                            <a href="#">Book Now</a>
                          </td>
                        </tr>
                        <tr>
                          <td>AB-</td>
                          <td>10</td>
                          <td>10</td>
                          <td>50</td>
                          <td>50</td>
                          <td className="book-now">
                            <a href="#">Book Now</a>
                          </td>
                        </tr>
                        <tr>
                          <td><b>Total</b></td>
                          <td><b>80</b></td>
                          <td><b>80</b></td>
                          <td><b>400</b></td>
                          <td><b>400</b></td>
                          <td><b>30</b></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="bd-button">
                  <a href="donate.html">Donate Blood</a>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default DonorPool;
