import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust import path if necessary
import { fetchPublicEvent } from "@/redux/slices/publicSlice";
import { useState, useEffect } from 'react';
import moment from 'moment'; // For handling date formatting
import { Link } from 'react-router-dom';

const EventAll = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { events, isLoading, isError, error } = useSelector((state: RootState) => state.public);

  const [filter, setFilter] = useState('*');

  useEffect(() => {
    dispatch(fetchPublicEvent({})); // Fetch events on component mount
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error}</p>;

  const eventsData = Array.isArray(events?.data) ? events.data : [];

  const handleFilterChange = (category: string) => {
    setFilter(category);
  };

  const filteredEvents = eventsData.filter((event) => {
    const today = moment().format('YYYY-MM-DD');
    if (filter === '*') return true;
    if (filter === 'past') return event.date < today;
    if (filter === 'current') return event.date === today;
    if (filter === 'upcoming') return event.date > today;
    return false;
  });

  return (
    <section className="event-section section">
      <div className="row mt-5">
        <div className="col-12">
          <div className="section-title">
            <h2 className="wow fadeInUp" data-wow-delay=".5s">Events</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <div className="event-btn-wrapper wow fadeInUp" data-wow-delay=".4s">
              <button
                className={`event-btn ${filter === '*' ? 'active' : ''}`}
                onClick={() => handleFilterChange('*')}
              >
                All
              </button>
              <button
                className={`event-btn ${filter === 'past' ? 'active' : ''}`}
                onClick={() => handleFilterChange('past')}
              >
                Past
              </button>
              <button
                className={`event-btn ${filter === 'current' ? 'active' : ''}`}
                onClick={() => handleFilterChange('current')}
              >
                Current
              </button>
              <button
                className={`event-btn ${filter === 'upcoming' ? 'active' : ''}`}
                onClick={() => handleFilterChange('upcoming')}
              >
                Upcoming
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredEvents.map((event) => (
            <div key={event.id} className={`col-lg-4 col-md-6 grid-item`}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventAll;
