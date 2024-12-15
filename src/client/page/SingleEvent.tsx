import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSingleEvent } from '@/redux/slices/publicSlice'; // Import the thunk
import moment from 'moment';
import './styles/SingleEvent.css';

const SingleEvent = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvent(id)); // Fetch event by ID
    }
  }, [dispatch, id]);

  const { singleEvent, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public
  );

  if (isLoading) return <p className="text-center my-5">Loading...</p>;

  if (isError) return <p className="text-danger text-center my-5">Error: {error}</p>;

  if (!singleEvent) return <p className="text-center my-5">No event found.</p>;

  return (
    <section className="single-event-section mt-14">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0">
              <img
                src={singleEvent.image}
                alt={singleEvent.title}
                className="card-img-top rounded-top"
              />
              <div className="card-body">
                <h2 className="card-title fw-bold mb-3">
                  {singleEvent.title}
                </h2>
                <h5 className="card-subtitle text-muted mb-3">
                  {moment(singleEvent.date).format('MMMM Do, YYYY')}
                </h5>
                
                <div className="event-description">
                  <p
                    className="card-text text-justify"
                    dangerouslySetInnerHTML={{ __html: singleEvent.description }}
                  ></p>
                </div>
              </div>
              <div className="card-footer text-center bg-light">
                <small className="text-muted"> ##  </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleEvent;
