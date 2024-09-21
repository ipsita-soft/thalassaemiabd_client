
const eventData = [
  {
    id: 1,
    title: "Thalassaemia Awareness Program at 10 Minutes School",
    image: "client/assets/images/event/img1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua...",
    date: "04 Jul, 2024",
    detailsLink: "event-details.html",
  },
  {
    id: 2,
    title: "Blood Donation Program at Stamford University",
    image: "client/assets/images/event/img2.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua...",
    date: "04 Jul, 2024",
    detailsLink: "event-details.html",
  },
  {
    id: 3,
    title: "Blood Donation Program at SL Embassy",
    image: "client/assets/images/event/img3.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua...",
    date: "04 Jul, 2024",
    detailsLink: "event-details.html",
  },
];

const LatestEvent = () => {
  return (
    <section id="event" className="event">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Latest Event</h2>
            </div>
          </div>
        </div>

        <div className="row mb-4 wow fadeInUp" data-wow-delay=".2s">
          {eventData.map((event, index) => (
            <div
              key={event.id}
              className="col-lg-4 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="card single_event">
                <img src={event.image} className="card-img-top" alt={event.title} />
                <div className="card-body">
                  <h5 className="card-title text-start">
                    <a href={event.detailsLink}>{event.title}</a>
                  </h5>
                  <p className="card-text">{event.description}</p>
                  <div className="more d-flex justify-content-between">
                    <span className="post-date">
                      <i className="lni lni-calendar"></i> {event.date}
                    </span>
                    <a href={event.detailsLink}>Read More</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button mt-4 text-center">
          <button className="btn">See More All Event</button>
        </div>
      </div>
    </section>
  );
};

export default LatestEvent;
