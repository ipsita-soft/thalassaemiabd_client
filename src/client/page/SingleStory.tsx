import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSingleStory } from "@/redux/slices/publicSlice";
import { fetchStory } from "@/redux/slices/publicSlice";
import { Link } from 'react-router-dom';
const SingleStory = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { singleStory, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public
  );


   useEffect(() => {
      dispatch(fetchStory({}));
    }, [fetchStory]);

  const { storys, isLoading: stLodding, isError : isStError } = useSelector((state: RootState) => state.public);


  console.log(storys);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleStory(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center my-5">Loading...</p>;

  if (isError)
    return <p className="text-danger text-center my-5">Error: {error}</p>;

  if (!singleStory) return <p className="text-center my-5">No data found.</p>;
  const blogNewsData = Array.isArray(storys?.data) ? storys.data : [];
  const descriptionParts = singleStory.description.split("</p>");
  return (
    <>
    <section className="single-event-section mt-14">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-lg border-0">
              <div className="row g-0">
                {/* Image Section */}
                <div className="col-md-6 col-12">
                  <img
                    src={singleStory.image || "placeholder.jpg"}
                    alt={singleStory.title || "Image"}
                    className="img-fluid w-100 h-100 object-fit-cover"
                    style={{ maxHeight: "500px" }}
                  />
                </div>

                {/* Side Description Section */}
                <div className="col-md-6 col-12 p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h1 className="fw-bold text-success mb-2">
                      {singleStory.title || "No Title Available"}
                    </h1>
                    <div
                      className="text-secondary"
                      dangerouslySetInnerHTML={{ __html: descriptionParts[0] || "" }}
                    ></div>
                    {/* Move the next paragraph to the top section */}
                    {descriptionParts[1] && (
                      <div
                        className="text-secondary mt-3"
                        dangerouslySetInnerHTML={{ __html: descriptionParts[1] || "" }}
                      ></div>
                    )}
                  </div>
                </div>

                {/* Bottom Description Section */}
                <div className="col-12 p-4">
                  <div
                    className="text-dark"
                    dangerouslySetInnerHTML={{
                      __html: descriptionParts.slice(2).join("</p>") || "",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="event-section section">
      <div className="row">
        <div className="col-12">
          <div className="section-title">
            <h2 className="wow fadeInUp" data-wow-delay=".5s">Related Stroy</h2>
          </div>
        </div>
      </div>

      <div className="container">
    
        <div className="row">
          {blogNewsData.map((blogNews) => (
            <div key={blogNews.id} className={`col-lg-4 col-md-4 grid-item`}>
            <Link to={`/story/${blogNews.id}`}>
              <div className="event-item-wrapper">
                <div className="event-img rounded">
        
                  <img src={blogNews.image} alt={blogNews.title} />
              
                </div>
                <div className="event-overlay">
                  <div className="pf-content">
                    <Link to={`/story/${blogNews.id}`} className="detail-btn">
                      <i className="lni lni-link"></i>
                    </Link>
                  
                    <h4><Link to={`/story/${blogNews.id}`}>{blogNews.title}</Link></h4>
                  </div>
                </div>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default SingleStory;
