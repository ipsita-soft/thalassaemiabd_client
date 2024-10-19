import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust import path if necessary
import { fetchPublicTifPages } from "@/redux/slices/publicSlice";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { File } from "lucide-react";
import { useParams } from 'react-router-dom';

interface TIFAttachment {
    id: number;
    title: string;
    file: string;
    status: string;
    type: string;
    sorting_index: number;
}

const TifMembership = () => {

    const { TifType } = useParams<{ TifType: string | undefined }>();

    const dispatch = useDispatch<AppDispatch>();
    const { tifPage, isLoading, isError, error } = useSelector(
        (state: RootState) => state.public
    );
    const [searchText, setSearchText] = useState<string>(""); // State for search input
    const [filteredNotices, setFilteredNotices] = useState<TIFAttachment[]>([]); // State for filtered notices

    useEffect(() => {
        if (TifType) {
            dispatch(fetchPublicTifPages(TifType)); // Fetch notices on component mount
        }
    }, [dispatch, TifType]); // Added TifType as dependency

    useEffect(() => {
        if (Array.isArray(tifPage?.tif_attachment)) {
            const filteredData = tifPage.tif_attachment.filter((tifAttachment: TIFAttachment) =>
                tifAttachment.title.toLowerCase().includes(searchText.toLowerCase()) ||
                tifAttachment.status.toLowerCase().includes(searchText.toLowerCase()) // Case-insensitive search
            );
            setFilteredNotices(filteredData);
        }
    }, [searchText, tifPage]);

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error: {error}</p>;

    const columns = [
        {
            name: "No",
            selector: (_row: TIFAttachment, index?: number) => (index !== undefined ? index + 1 : "-"),
            sortable: true,
        },
        {
            name: "Title",
            selector: (row: TIFAttachment) => row.title,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row: TIFAttachment) => row.status,
            sortable: true,
        },
        {
            name: "Download",
            cell: (row: TIFAttachment) => (
                <a href={row.file} target="_blank" rel="noopener noreferrer">
                    <File />
                </a>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <section className="section tif-membership mt-14">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="single-inner">
                            <div className="post-thumbnils">
                                <img src={tifPage?.image} alt="TIF Membership" />
                            </div>
                            <div className="post-details">
                                <div className="detail-inner">
                                    <div className="row">
                                        <div className="col-lg-7 col-md-7 col-12">
                                            <div className="tif-article">
                                                <h4>{tifPage?.title}</h4>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: tifPage?.description ? tifPage.description : '',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-5 col-12">
                                            <div className="tif-video">
                                                <iframe
                                                    width="100%"
                                                    height="239"
                                                    src={tifPage?.videolink}
                                                    title="Global Thalassaemia Review | A Useful Introduction"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* TIF Gallery Section */}
                                    {/* <article className="mt-5 img-slider">

                                        <div className="slider-container first-sample">
                                            <div className="slider">
                                                <div className="item"><img src="assets/images/gallery/add.jpg" alt=""/></div>
                                                <div className="item"><img src={tifPage?.image} alt=""/></div>

                                            </div>


                                            <i className="lni lni-arrow-left-circle prev-slide"></i>
                                            <i className="lni lni-arrow-right-circle next-slide"></i>
                                        </div>
                                    </article> */}


                                    <div className="wow fadeInLeft mt-4" data-wow-delay=".7s">
                                        <div className="doctors_slide">
                                            <div
                                                id="carouselExampleCaptions"
                                                className="carousel slide doctor_slide"
                                                data-bs-ride="carousel"
                                            >
                                                <div className="carousel-inner doctors">
                                                    {tifPage?.tif_slider.map((slider, index: number) => (
                                                        <div
                                                            key={slider.id}
                                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                                        >
                                                            <img
                                                                src={slider.image}
                                                                className="d-block w-100 img-fluid rounded shadow"
                                                                alt="Slider"
                                                                style={{ maxHeight: '500px', objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                <button
                                                    className="carousel-control-prev"
                                                    type="button"
                                                    data-bs-target="#carouselExampleCaptions"
                                                    data-bs-slide="prev"
                                                >
                                                    <span
                                                        className="carousel-control-prev-icon bg-red-800 rounded-circle p-2"
                                                        aria-hidden="true"
                                                    ></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button
                                                    className="carousel-control-next"
                                                    type="button"
                                                    data-bs-target="#carouselExampleCaptions"
                                                    data-bs-slide="next"
                                                >
                                                    <span
                                                        className="carousel-control-next-icon  bg-red-800 rounded-circle p-2"
                                                        aria-hidden="true"
                                                    ></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>



                                    {/* Attachment Section */}

                                    <div className="notice-details ">
                                        <div className="container">

                                            <div className="row mt-14">
                                                <div className="col-12">
                                                    <div className="section-title">
                                                        <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                                            Attachment
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Search input field */}
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <input
                                                        type="text"
                                                        className="form-control search-box"
                                                        placeholder="Search by title or date"
                                                        value={searchText}
                                                        onChange={(e) => setSearchText(e.target.value)} // Update search text on input change
                                                        style={{
                                                            border: "2px solid #ced4da",
                                                            borderRadius: "4px",
                                                            padding: "10px",
                                                            fontSize: "16px",
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="card p-4 mb-5">
                                                        <DataTable
                                                            columns={columns}
                                                            data={filteredNotices} // Use filtered data instead of original data
                                                            pagination
                                                            highlightOnHover
                                                            striped
                                                            responsive
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    {/* End Attachment Section */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TifMembership;
