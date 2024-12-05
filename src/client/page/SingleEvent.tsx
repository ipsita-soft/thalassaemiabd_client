import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSingleEvent } from '@/redux/slices/publicSlice'; // Import the thunk
import './styles/SingleEvent.css'; 
import moment from 'moment';

const SingleEvent = () => {
  const { id } = useParams<{ id: string }>(); // Get event ID from URL
  const dispatch = useDispatch<AppDispatch>();

  // Access event data from Redux state
  const { singleEvent, isLoading, isError, error } = useSelector((state: RootState) => state.public);

  console.log('asfasdf ',id);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvent(id)); // Fetch event by ID
    }
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (isError) return <p className="text-danger text-center">Error: {error}</p>;

  if (!singleEvent) return <p className="text-center">No event found.</p>;

  return (
    <section className="single-event-section section">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card shadow">
              <img src={singleEvent.image} alt={singleEvent.title} className="card-img-top" />
              <div className="card-body">
                <h2 className="card-title">{singleEvent.title}</h2>
                <h5 className="card-subtitle mb-2 text-muted">
                  {moment(singleEvent.date).format('MMMM Do, YYYY')}
                </h5>
                <div className="event-description">
                  <p className="card-text" dangerouslySetInnerHTML={{ __html: singleEvent.description }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleEvent;
