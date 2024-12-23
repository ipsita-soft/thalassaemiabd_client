import { CSSProperties, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust import path if necessary
import { fetchPublicEvent } from "@/redux/slices/publicSlice";
import { Link } from "react-router-dom";

// Define the lineClamp function with proper typing
const lineClamp = (lines: number): CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines.toString(),
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const LatestEvent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { events, isLoading, isError } = useSelector((state: RootState) => state.public);

  useEffect(() => {
    dispatch(fetchPublicEvent({ per_page: 3 })); // Fetch events on component mount
  }, [dispatch]);

  if (isLoading) return <p></p>;

  if (isError) return <p>Error</p>;

  const eventsData = Array.isArray(events?.data) ? events.data : [];

  return (
    <section id="event" className="event pb-2">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Latest Events</h2>
            </div>
          </div>
        </div>

        <div className="row mb-4 wow fadeInUp" data-wow-delay=".2s">
          {eventsData.map((event, index) => (
            <div
              key={event.id}
              className="col-lg-4 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="card single_event">
                <Link to={`/events/${event.id}`}>
                <div className="imgheight">
                <img
                    src={event.image}
                    className="card-img-top "
                    alt={event.title}
                  />
                </div>

                </Link>
                <div className="card-body">
                  <h5 className="card-title text-start" >
                    <Link style={lineClamp(2)} to={`/events/${event.id}`}>{event.title}</Link>
                  </h5>
                  <p className="card-text" style={{ ...lineClamp(5), textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: event.description }}>
                  </p>
                  <div className="more d-flex justify-content-between">
                    <span className="post-date">
                      <i className="lni lni-calendar"></i> {event.date}
                    </span>
                    <Link to={`/events/${event.id}`}>Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button mt-4 text-center">
          <Link to='/events-all' className="btn">See All Events</Link>
        </div>
      </div>
    </section>
  );
};

export default LatestEvent;
