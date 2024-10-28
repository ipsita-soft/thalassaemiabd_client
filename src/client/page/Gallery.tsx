import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchPublicGallery } from "@/redux/slices/publicSlice";

const Gallery = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { galleries, isLoading, isError, error } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        dispatch(fetchPublicGallery({ type: 'photo' }));  // Fetch gallery items on mount
    }, [dispatch]);

    useEffect(() => {
        // Only initialize GLightbox if galleries are loaded
        if (galleries.data) {
            const lightbox = GLightbox({
                selector: ".portfolio-lightbox",
                touchNavigation: true,
                loop: true,
                zoomable: true
            });
            return () => lightbox.destroy(); // Clean up on unmount
        }
    }, [galleries]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error}</p>;
    }

    const galleriesData = Array.isArray(galleries.data) ? galleries.data : [];

    return (
        <section id="gallery" className="gallery">
            <div className="container">

                
                <div className="section-title">
                    <h2 className="wow fadeInUp mt-24" data-wow-delay=".2s">Photo Gallery</h2>
                </div>
                
                <div className="row mb-5 gy-4 gallery-container" data-aos="fade-up" data-aos-delay="200">
                    {galleriesData.map(item => (
                        <div key={item.id} className="col-lg-4 col-md-6 gallery-item">
                            <div className="gallery-wrap">
                                <img src={item.image} className="img-fluid" alt={item.type} />
                                <div className="gallery-info">
                                    {/* <h4>{item.type}</h4> */}
                                    <div className="gallery-links">
                                        <a 
                                            href={item.image} 
                                            className="portfolio-lightbox" 
                                            data-gallery="galleryGallery" 
                                            // title={item.type}
                                        >
                                            <i className="lni lni-plus"></i>
                                        </a>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

               
            </div>
        </section>
    );
};

export default Gallery;
