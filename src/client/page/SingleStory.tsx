import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSingleStory } from '@/redux/slices/publicSlice'; // Import the thunk
import './styles/SingleEvent.css'; 

const SingleStory = () => {
  const { id } = useParams<{ id: string }>(); // Get event ID from URL
  const dispatch = useDispatch<AppDispatch>();

  // Access event data from Redux state
  const { singleStory, isLoading, isError, error } = useSelector((state: RootState) => state.public);
  
  console.log(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleStory(id)); // Fetch event by ID
    }
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (isError) return <p className="text-danger text-center">Error: {error}</p>;

  if (!singleStory) return <p className="text-center">No data found.</p>;

  return (
    <section className="single-event-section section mt-14">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow">
              <img src={singleStory.image} alt={singleStory.title} className="card-img-top" />
              <div className="card-body">
                <h2 className="card-title text-destructive">{singleStory.title}</h2>
               
                <div className="event-description">
                  <p className="card-text" dangerouslySetInnerHTML={{ __html: singleStory.description }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleStory;
