import { fetchSliders } from "@/redux/slices/sliderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeroArea = () => {
    const dispatch = useDispatch();
    const { sliders, isLoading, isError, error } = useSelector((state) => state.sliders);

    useEffect(() => {
        dispatch(fetchSliders());
    }, [dispatch]);

    if (isLoading) {
        // return <p>Loading...</p>;
        
    }

    if (isError) {
        return <p>Error: {error}</p>;
    }

    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                {sliders && sliders.map((slider, index) => (
                    <div 
                        key={slider.id} 
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                        <img src={slider.image} className="d-block w-100" alt={slider.title} />
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
