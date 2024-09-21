

const LatestNews = () => {
  return (
    <div className="latest-news-area section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 mb-3">
            <div className="single-news wow fadeInUp" data-wow-delay=".2s">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-12 pb-2">
                  <div className="card shadow-sm">
                    <img
                      src="client/assets/images/patient/patient1.jpg"
                      className="card-img-top"
                      alt="Patient's Story"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href="">Patient's Story</a>
                      </h5>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur elit, sed do
                        eiusmod. Lorem ipsum dolor sit amet, consectetur elit,
                        sed do eiusmod.
                        <a href="blog-single.html">Read More</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-12 pb-2">
                  <div className="card shadow-sm">
                    <img
                      src="client/assets/images/patient/donor2.jpg"
                      className="card-img-top"
                      alt="Blood Donor's Story"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href="">Blood Donor's Story</a>
                      </h5>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur elit, sed do
                        eiusmod. Lorem ipsum dolor sit amet, consectetur elit,
                        sed do eiusmod.
                        <a href="blog-single.html">Read More</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-12">
                  <div className="card shadow-sm">
                    <img
                      src="client/assets/images/about-boxes-1.jpg"
                      className="card-img-top"
                      alt="Sponsor's Story"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href="">Sponsor's Story</a>
                      </h5>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur elit, sed do
                        eiusmod. Lorem ipsum dolor sit amet, consectetur elit,
                        sed do eiusmod.
                        <a href="blog-single.html">Read More</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single News */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
