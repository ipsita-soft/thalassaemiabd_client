import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchDoctorSlider } from "@/redux/slices/publicSlice";


interface DoctorSliders {
  id: number;
  image: string;
  name: string;
  sorting_index: number; // Added sorting_index
  status: string;        // Added status
}


const PatientManagement = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { doctorSliders, isLoading, isError } = useSelector((state: RootState) => state.public);
  useEffect(() => {
    dispatch(fetchDoctorSlider({}));  // Fetch sliders on mount
  }, [dispatch]);
 const location = useLocation();
 console.log('SADFSAFD',location.pathname);
  

  if (isLoading) {
    return <p>Loading...</p>;  // Show loading state
  }

  if (isError) {
    return <p>Error:</p>;  // Show error message if any
  }

  const doctorSliderData: DoctorSliders[] = Array.isArray(doctorSliders.data) ? doctorSliders.data : [];

  console.log(doctorSliders);


  return (
 
      <section className={`treatment section pt-1 ${location.pathname == '/treatment' ? 'mt-14 pt-5':''}`}>

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

                  
                {doctorSliderData.map((slider: DoctorSliders, index: number) => (
                    <div 
                        key={slider.id} 
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                        <img src={slider.image} className="d-block w-100" alt={slider.name || 'Slider'} />

                        <div className="carousel-caption d-none d-md-block doctors_details">
                      <h5>{slider.name}</h5>
                    </div>
                    </div>
                ))}
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
