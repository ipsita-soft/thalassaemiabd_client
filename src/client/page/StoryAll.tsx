import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchStory } from "@/redux/slices/publicSlice";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const StoryAll = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { storys, isLoading, isError, error } = useSelector((state: RootState) => state.public);

  useEffect(() => {
    dispatch(fetchStory({}));
  }, [fetchStory]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error}</p>;

  const blogNewsData = Array.isArray(storys?.data) ? storys.data : [];

  return (
    <section className="event-section section mt-14">
      <div className="row">
        <div className="col-12">
          <div className="section-title">
            <h2 className="wow fadeInUp" data-wow-delay=".5s">Stroy</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {blogNewsData.map((blogNews) => (
            <div key={blogNews.id} className={`col-lg-4 col-md-6 grid-item`}>
            <Link to={`/story/${blogNews.id}`}>
              <div className="event-item-wrapper">
                <div className="event-img">
         
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
  );
};

export default StoryAll;
