
const PatientManagement = () => {
  return (
    <section className="treatment section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".7s">
                Patient Management
              </h2>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-7 col-md-7 col-sm-12 wow fadeInLeft" data-wow-delay=".7s">
            <div className="doctors_slide">
              <div id="carouselExampleCaptions" className="carousel slide doctor_slide" data-bs-ride="carousel">
                <div className="carousel-inner doctors">
                  <div className="carousel-item active">
                    <img
                      src="client/assets/images/doctors/Dr. Kabirul Islam.JPG"
                      className="d-block w-100"
                      alt="Dr. Kabirul Islam"
                    />
                    <div className="carousel-caption d-none d-md-block doctors_details">
                      <h5>Dr. Kabirul Islam</h5>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="client/assets/images/doctors/Prof. Dr. M A Khan.JPG"
                      className="d-block w-100"
                      alt="Dr. M A Khan"
                    />
                    <div className="carousel-caption d-none d-md-block doctors_details">
                      <h5>Dr. M A Khan</h5>
                    </div>
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon nextprev" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon nextprev" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="row treatment-button wow fadeInRight" data-wow-delay=".7s">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="tb">
                  <a href="#">New Patient Registration</a>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="tb">
                  <a href="appointment.html">Doctors Appointment</a>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="tb">
                  <a href="#">Bed Booking</a>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="tb">
                  <a href="#">Blood Booking</a>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="tb">
                  <a href="#">All Tests</a>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="tb">
                  <a href="product.html">Buy Medicine</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientManagement;
