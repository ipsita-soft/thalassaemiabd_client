import { useEffect } from "react";
import "glightbox/dist/css/glightbox.min.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchFounder } from "@/redux/slices/publicSlice";





const Founder = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { founder } = useSelector((state: RootState) => state.public);
  
    useEffect(() => {
      dispatch(fetchFounder({}));
    }, [dispatch]);
  




    return (
        <section className="section founder">
        <div className="container">
            <div className="row mt-14">
                <div className="col-lg-12 col-md-12">
                    <div className="founder-page">

                        <div className="founder-title text-center">
                            <h2>{founder?.title}</h2>
                        </div>
                        

                        <div className="founder-content text-center mt-5">

        
                            <img className="img-fluid m-0 m-auto" src="/client/assets/images/founder.jpg" alt=""/>
                            <h5 className="card-title">{founder?.name}</h5>
                            <span className="pdesig">{founder?.designation}</span>
                            
                            <p>
                                {founder?.description}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    );
};

export default Founder;
