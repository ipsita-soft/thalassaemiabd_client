import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchSingleEvent, fetchPublicEvent } from '@/redux/slices/publicSlice';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './styles/SingleEvent.css';

const SingleEvent = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Fetch Single Event
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvent(id));
    }
  }, [dispatch, id]);

  // Fetch All Events
  useEffect(() => {
    dispatch(fetchPublicEvent({}));
  }, [dispatch]);

  const { singleEvent, events, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public
  );

  if (isLoading) return <p className="text-center my-5">Loading...</p>;
  if (isError) return <p className="text-danger text-center my-5">Error: {error}</p>;
  if (!singleEvent) return <p className="text-center my-5">No event found.</p>;

  const descriptionParts = singleEvent.description.split("</p>");
  const allevents = Array.isArray(events?.data) ? events.data : [];
  return (
    <>
      {/* Single Event Section */}
      <section className="single-event-section mt-14">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0">
                <div className="row g-0">
                  {/* Image Section */}
                  <div className="col-md-6 col-12">
                    <img
                      src={singleEvent.image || "placeholder.jpg"}
                      alt={singleEvent.title || "Image"}
                      className="img-fluid w-100 h-100 object-fit-cover"
                      style={{ maxHeight: "500px" }}
                    />
                  </div>

                  {/* Side Description Section */}
                  <div className="col-md-6 col-12 p-4 d-flex flex-column justify-content-between">
                    <div>
                      <h1 className="fw-bold text-success mb-2">
                        {singleEvent.title || "No Title Available"}
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

      {/* Events Section */}
      <section className="event-section section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2 className="wow fadeInUp" data-wow-delay=".5s">Related Events</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {allevents.map((event) => (
            <div key={event.id} className={`col-lg-4 col-md-6 grid-item`}>
              <Link to={`/events/${event.id}`}>
              <div className="event-item-wrapper">
                <div className="event-img">
                  <img src={event.image} alt={event.title} />
                </div>
                <div className="event-overlay">
                  <div className="pf-content">
                    <Link to={`/events/${event.id}`} className="detail-btn">
                      <i className="lni lni-link"></i>
                    </Link>
                    <span className="category">{moment(event.date).format('MMMM Do, YYYY')}</span>
                    <h4><Link to={`/events/${event.id}`}>{event.title}</Link></h4>
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

export default SingleEvent;
