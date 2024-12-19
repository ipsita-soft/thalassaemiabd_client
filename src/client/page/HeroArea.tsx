import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchPublicSlider } from "@/redux/slices/publicSlice";

// Define the type for the slider item (based on the data you expect in the slider)
interface Slider {
    id: number;
    image: string;
    title?: string; // title is optional based on your data
}

const HeroArea = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Adjust the selector to properly match the state structure
    const { sliders, isLoading, isError } = useSelector((state: RootState) => state.public);

    useEffect(() => {
        dispatch(fetchPublicSlider({}));  // Fetch sliders on mount
    }, [dispatch]);

    if (isLoading) {
        return <p></p>;  // Show loading state
    }

    if (isError) {
        return <p>Error</p>;  // Show error message if any
    }

    // Access the data array from sliders
    const sliderData: Slider[] = Array.isArray(sliders.data) ? sliders.data : [];
    
   

    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                {sliderData.map((slider: Slider, index: number) => (
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
