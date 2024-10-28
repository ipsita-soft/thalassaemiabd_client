import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchWhoWeArePage, fetchPublicYearList } from "@/redux/slices/publicSlice";

interface WhoWeArePage {
    id: number;
    image: string;
    name: string;
    designation: string;
    type: string;
    sorting_index: number;
    status: string;
}

const AdvisorsCommittee = () => {
    const dispatch = useDispatch<AppDispatch>();

    // State to store selected year
    const [yearId, setYearId] = useState<number | null>(null);
    const [activeData, setActiveData] = useState<string | undefined>(undefined);


    // Select data from the Redux store
    const {
        whoWeArePage,
        yearList,
        isLoading: isPublicLoading,
        isError: isPublicError,
        error: publicError,
    } = useSelector((state: RootState) => state.public);

    // Set yearId to the latest year when yearList is fetched
    useEffect(() => {
        if (yearList?.data) {
            const activeYear = yearList.data.find((year: any) => year.status === 'Active');

            if (activeYear) {
                setYearId(activeYear.id);

                // Set the active year ID to state
            }
        }
    }, [yearList])

    // Fetch WhoWeArePage data when the year changes
    useEffect(() => {
        if (yearId !== null && yearList?.data?.length > 0) {
            // Fetch the page data based on the selected year
            dispatch(fetchWhoWeArePage({ type: 'advisors', year_id: yearId }));

            // Find the selected year data from yearList.data
            const selectedYearData = yearList.data.find((year: any) => year.id === yearId);

            // Set the selected year 'date' to state
            if (selectedYearData) {
                setActiveData(selectedYearData.date);  // Assuming you want to store 'date'
            } else {
                console.error('No matching year found');
            }
        }
    }, [dispatch, yearId, yearList?.data]);


    // Fetch Year List data
    useEffect(() => {
        dispatch(fetchPublicYearList({}));
    }, [dispatch]);

    // Handle loading and error states
    if (isPublicLoading) return <p>Loading...</p>;
    if (isPublicError) return <p>Error: {publicError}</p>;

    // Process yearList and whoWeArePage data
    const yearLists = Array.isArray(yearList?.data) ? yearList.data : [];
    const advisors: WhoWeArePage[] = Array.isArray(whoWeArePage?.data) ? whoWeArePage.data : [];

    // Function to handle year change
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYearId = Number(event.target.value);
        setYearId(selectedYearId);  // Update the yearId state
    };

    return (
        <section className="advisors-Committee section mt-14">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h2 className="wow fadeInUp" data-wow-delay=".4s">
                                Advisors Committee
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row Management-header wow fadeInUp" data-wow-delay=".2s">
                        <div className="col-lg-9 col-md-9 col-sm-9">
                            <h4 className="mt-2">Advisors Committee ({activeData})</h4>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <select className="form-select" aria-label="Year selection" value={yearId || ''} onChange={handleYearChange}>
                                <option value="">Select Years</option>
                                {yearLists.map((years) => (
                                    <option key={years.id} value={years.id}>
                                        {years?.date}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {advisors.map((advisor, index) => (
                        <div key={index} className="col-lg-3 col-md-3 col-12">
                            <div className={`single-member wow fadeInUp`} data-wow-delay=".2s">
                                <div className="image text-center d-flex justify-content-center">
                                    <img src={advisor?.image} alt={advisor?.name} />
                                </div>
                                <div className="content mt-2">
                                    <h3>
                                        <a href="#">{advisor?.name}</a>
                                    </h3>
                                    <h5>{advisor?.designation}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdvisorsCommittee;
