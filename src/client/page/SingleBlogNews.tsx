import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchSingleBlogNews, fetchPublicBlogNews } from '@/redux/slices/publicSlice';
import './styles/SingleEvent.css';


const SingleBlogNews = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Fetch single blog news data
  const { singleBlogNews, isLoading: singleLoading, isError: singleError, error: singleErrorMessage } = useSelector(
    (state: RootState) => state.public
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBlogNews(id));
    }
  }, [dispatch, id]);

  // Fetch all blog news
  const { blogNews, isLoading: blogLoading, isError: blogError, error: blogErrorMessage } = useSelector(
    (state: RootState) => state.public
  );

  useEffect(() => {
    dispatch(fetchPublicBlogNews({}));
  }, [dispatch]);

  if (singleLoading || blogLoading) return <p className="text-center my-5">Loading...</p>;

  if (singleError) return <p className="text-danger text-center my-5">Error: {singleErrorMessage}</p>;

  if (!singleBlogNews) return <p className="text-center my-5">No Data found.</p>;

  const descriptionParts = singleBlogNews.description.split("</p>");
  const blogNewsss = Array.isArray(blogNews?.data) ? blogNews.data : [];
  return (
    <>
      {/* Single Blog Section */}
      <section className="single-event-section mt-14">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0">
                <div className="row g-0">
                  {/* Image Section */}
                  <div className="col-md-6 col-12">
                    <img
                      src={singleBlogNews.image || "placeholder.jpg"}
                      alt={singleBlogNews.title || "Image"}
                      className="img-fluid w-100 h-100 object-fit-cover"
                      style={{ maxHeight: "500px" }}
                    />
                  </div>

                  {/* Side Description Section */}
                  <div className="col-md-6 col-12 p-4 d-flex flex-column justify-content-between">
                    <div>
                      <h1 className="fw-bold text-success mb-2">
                        {singleBlogNews.title || "No Title Available"}
                      </h1>
                      <div
                        className="text-secondary"
                        dangerouslySetInnerHTML={{ __html: descriptionParts[0] || "" }}
                      ></div>
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

      {/* Blog & News Section */}
      <section className="event-section section">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".5s">Related Blog & News</h2>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
          {blogNewsss.map((blogNews) => (
            <div key={blogNews.id} className={`col-lg-4 col-md-6 grid-item`}>
              <Link to={`/blog-news/${blogNews.id}`}>
              <div className="event-item-wrapper">
                
                  <div className="event-img">
                    <img src={blogNews.image} alt={blogNews.title} />
                  </div>
                
                <div className="event-overlay">
                  <div className="pf-content">
                    <Link  to={`/blog-news/${blogNews.id}`} className="detail-btn cursor-pointer">
                      <i className="lni lni-link"></i>
                    </Link>
                   
                    <h4><Link to={`/blog-news/${blogNews.id}`}>{blogNews.title}</Link></h4>
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

export default SingleBlogNews;
