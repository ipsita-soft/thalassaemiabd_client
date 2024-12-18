
import { CSSProperties, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchStory } from "@/redux/slices/publicSlice";
import { Link } from "react-router-dom";
const lineClamp = (lines: number): CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines.toString(),
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
const LatestStory = () => {

  const dispatch = useDispatch<AppDispatch>();

  // Adjust the selector to properly match the state structure
  const { storys, isLoading, isError } = useSelector((state: RootState) => state.public);

  useEffect(() => {
    dispatch(fetchStory({ per_page: 3 })); // Fetch blog news on mount
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (isError) {
    return <p>Error:</p>; // Show error message if any
  }

  const data = Array.isArray(storys.data) ? storys.data : [];

  return (
    <div className="latest-news-area section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 mb-3">
            <div className="single-news wow fadeInUp" data-wow-delay=".2s">
              <div className="row">
                {data.map((story) => (
                  <div className="col-lg-4 col-md-6 col-12 pb-2">
                    <div className="card shadow-sm">
                      <Link to={`/story/${story.id}`}>
                        <div className="imgheight">
                            <img src={story.image} alt={story.title} className="card-img-top imgheight" />
                        </div>
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link style={lineClamp(2)} to={`/story/${story.id}`}>{story.title}</Link>
                        </h5>


                        <p className="card-text" style={{ ...lineClamp(5), textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: story.description }}>
                        </p>

                        <div className="more mt-2 d-flex justify-content-between">

                          <Link to={`/story/${story.id}`}>Read More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
            {/* End Single News */}
          </div>
        </div>
        <div className="button mt-4 text-center">
          <Link to='/story-all' className="btn">See All Stories</Link>
        </div>
      </div>
    </div>
  );
};

export default LatestStory;
