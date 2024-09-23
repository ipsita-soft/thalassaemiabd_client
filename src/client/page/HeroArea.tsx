import { fetchPublicSlider } from "@/redux/slices/publicSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeroArea = () => {
    const dispatch = useDispatch();
    const { sliders, isLoading, isError, error } = useSelector((state) => state.public);  // Adjust state selector

    useEffect(() => {
        dispatch(fetchPublicSlider());
    }, [dispatch]);

    if (isLoading) {
        return <p>Loading...</p>;  // Show loading state
    }

    if (isError) {
        return <p>Error: {error}</p>;  // Show error message if any
    }

    // Ensure `sliders.data` exists and is an array before attempting to map
    const sliderData = sliders?.data || [];

    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                {sliderData.map((slider, index) => (
                    <div 
                        key={slider.id} 
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                        <img src={slider.image} className="d-block w-100" alt={slider.title || 'Slider'} />
                    </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon nextpre" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon nextpre" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default HeroArea;
