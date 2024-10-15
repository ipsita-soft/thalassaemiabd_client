import { CSSProperties, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchPublicBlogNews } from "@/redux/slices/publicSlice";
import { Link } from "react-router-dom";

// Define the lineClamp function with proper typing
const lineClamp = (lines: number): CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines.toString(),
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const BlogNews = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Adjust the selector to properly match the state structure
  const { blogNews, isLoading, isError, error } = useSelector((state: RootState) => state.public);

  useEffect(() => {
    dispatch(fetchPublicBlogNews({ per_page: 6 })); // Fetch blog news on mount
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (isError) {
    return <p>Error: {error}</p>; // Show error message if any
  }

  const sliderData = Array.isArray(blogNews.data) ? blogNews.data : [];

  return (
    <section id="about-boxes" className="about-boxes">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Our Blog & News</h2>
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay=".2s">
          {sliderData.map((blog, index) => (
            <div
              key={blog.id}
              className="col-lg-4 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="card">
                <img src={blog.image} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                  <h5 className="card-title text-start" style={lineClamp(2)}>
                    <Link to={`/blog-news/${blog.id}`} target="_blank">
                      {blog.title}
                    </Link>
                  </h5>
                  <p className="card-text" style={{ ...lineClamp(5), textAlign: "justify" }}>
                    {blog.description} 
                  </p>
                  <Link to={`/blog-news/${blog.id}`}>Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button mt-4 text-center">
          <Link to='blog-news-all' className="btn">See More All News</Link>
        </div>
      </div>
    </section>
  );
};

export default BlogNews;
