
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchWhoWeArePage } from "@/redux/slices/publicSlice";


interface WhoWeArePage {
    id: number;
    image: string;
    name: string;
    designation: string;
    type: string;
    sorting_index: number;
    status: string;
}



const BloodCollectionCommittee = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { whoWeArePage, isLoading, isError, error } = useSelector((state: RootState) => state.public);
    useEffect(() => {
        dispatch(fetchWhoWeArePage('blood-collection-committee'));  // Fetch sliders on mount
    }, [dispatch]);


    if (isLoading) {
        return <p>Loading...</p>;  // Show loading state
    }

    if (isError) {
        return <p>Error: {error}</p>;  // Show error message if any
    }

    const advisors: WhoWeArePage[] = Array.isArray(whoWeArePage.data) ? whoWeArePage.data : [];

    console.log(advisors); // This will log the actual slider data




    return (
        <section className="advisors-Committee section mt-14">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h2 className="wow fadeInUp" data-wow-delay=".4s">
                            Blood Collection Committee
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {advisors.map((advisor, index) => (
                        <div
                            key={index}
                            className="col-lg-3 col-md-3 col-12"
                        >
                            <div
                                className={`single-member wow fadeInUp`}
                                data-wow-delay=".2s"
                            >
                                <div className="image text-center d-flex justify-content-center">
                                    <img src={advisor.image} alt={advisor.name} />
                                </div>
                                <div className="content mt-2">
                                    <h3>
                                        <a href="#">{advisor.name}</a>
                                    </h3>
                                    <h5>{advisor.designation}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BloodCollectionCommittee;
