import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSingleBlogNews } from '@/redux/slices/publicSlice'; // Import the thunk
import './styles/SingleEvent.css'; 

const SingleBlogNews = () => {
  const { id } = useParams<{ id: string }>(); // Get event ID from URL
  const dispatch = useDispatch<AppDispatch>();

  // Access event data from Redux state
  const { singleBlogNews, isLoading, isError, error } = useSelector((state: RootState) => state.public);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBlogNews(id)); // Fetch event by ID
    }
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (isError) return <p className="text-danger text-center">Error: {error}</p>;

  if (!singleBlogNews) return <p className="text-center">No event found.</p>;

  return (
    <section className="single-event-section section">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow">
              <img src={singleBlogNews.image} alt={singleBlogNews.title} className="card-img-top" />
              <div className="card-body">
                <h2 className="card-title text-destructive">{singleBlogNews.title}</h2>
               
                <div className="event-description">
                  <p className="card-text" dangerouslySetInnerHTML={{ __html: singleBlogNews.description }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogNews;
