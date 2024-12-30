import { useEffect } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAboutThalassaemia } from "@/redux/slices/publicSlice";

const Thalassemia = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { aboutthalassaemia } = useSelector((state: RootState) => state.public);

  // Fetch the about Thalassemia data when the component mounts
  useEffect(() => {
    dispatch(fetchAboutThalassaemia({}));
  }, [dispatch]);

  // Initialize GLightbox when component is mounted
  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox", // Target the glightbox class
      autoplayVideos: true, // Autoplay video when the modal opens
      width: "900px", // Set modal width
    });

    return () => lightbox.destroy(); // Cleanup GLightbox when component unmounts
  }, []);

  // Split description content for structured rendering
  const descriptionParts = aboutthalassaemia?.description?.split("</p>") || [];

  return (
    <section className="single-event-section about-us mt-14">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card shadow-lg border-0">
              <div className="row g-0">
                {/* Image Section */}
                <div className="col-md-6 col-12">
                  <div className="content-left wow fadeInLeft" data-wow-delay=".3s">
                    <img
                      src="client/assets/images/financial/blood2.jpg"
                      alt="Thalassemia Overview"
                      className="img-fluid w-100 h-100 object-fit-cover"
                    />
                    <a
                      href={aboutthalassaemia?.video || "#"}
                      data-glightbox="type: video"
                      className="glightbox video"
                    >
                      <i className="lni lni-play"></i>
                    </a>
                  </div>
                </div>

                {/* Side Description Section */}
                <div className="col-md-6 col-12 p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h1 className="fw-bold text-success mb-2">
                      {aboutthalassaemia?.title}{" "}
                    </h1>
                    {descriptionParts.slice(0, 7).map((part, index) => (
                      <div
                        key={index}
                        className="text-secondary"
                        dangerouslySetInnerHTML={{ __html: part || "" }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Bottom Description Section */}
                <div className="col-12 p-4">
                  <div
                    className="text-dark"
                    dangerouslySetInnerHTML={{
                      __html: descriptionParts.slice(7).join("</p>") || "",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thalassemia;
