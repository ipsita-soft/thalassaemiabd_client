import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchPublicGallery } from "@/redux/slices/publicSlice";


const Gallery = () => {


    const dispatch = useDispatch<AppDispatch>();

    // Adjust the selector to properly match the state structure
    const { galleries, isLoading, isError, error } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        dispatch(fetchPublicGallery({ type: 'photo' }));  // Fetch sliders on mount
    }, [dispatch]);

    if (isLoading) {
        return <p>Loading...</p>;  // Show loading state
    }

    if (isError) {
        return <p>Error: {error}</p>;  // Show error message if any
    }

    const galleriesData = Array.isArray(galleries.data) ? galleries.data : [];




    return (
        <section id="gallery" className="gallery">

            <div className="">
                <div className="col-12">
                    <div className="section-title">
                        <h2 className="wow fadeInUp" data-wow-delay=".5s">.</h2>
                    </div>
                </div>
            </div>


            <div className="container" data-aos="fade-up">

                <div className="">
                    <div className="col-12">
                        <div className="section-title">
                            <h2 className="wow fadeInUp" data-wow-delay=".2s">Photo Gallery</h2>
                        </div>
                    </div>
                </div>

                <div className="row mb-5 gy-4 gallery-container" data-aos="fade-up" data-aos-delay="200">
                    {galleriesData.map(item => (
                        <div key={item.id} className="col-lg-4 col-md-6 gallery-item">
                            <div className="gallery-wrap">
                                <img src={item.image} className="img-fluid" alt={item.image} />
                                <div className="gallery-info">
                                    <h4>{item.type}</h4>
                                    <div className="gallery-links">
                                        <a href={item.image} data-gallery="galleryGallery" className="portfokio-lightbox" title={item.type}>
                                            <i className="lni lni-plus"></i>
                                        </a>
                                        <a href="gallery-details.html" title="More Details">
                                            <i className="lni lni-link"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default Gallery;
