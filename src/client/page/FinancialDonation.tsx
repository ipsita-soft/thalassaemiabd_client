import { Link } from "react-router-dom";

const financialDonations = [
  {
    id: 1,
    title: "Zakat Donation",
    image: "client/assets/images/financial/zakat2.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua...",
    link: "#",
    donateLink: "donate.html",
  },
  {
    id: 2,
    title: "Sponsor A Child",
    image: "client/assets/images/financial/child2.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua...",
    link: "#",
    donateLink: "donate.html",
  },
  {
    id: 3,
    title: "General Donation",
    image: "client/assets/images/financial/financial.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua...",
    link: "#",
    donateLink: "donate.html",
  },
];

const FinancialDonation = () => {
  return (
    <section id="financial" className="financial">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".2s">
                Financial Donation
              </h2>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          {financialDonations.map((donation, index) => (
            <div
              key={donation.id}
              className={`col-lg-4 col-md-6 d-flex align-items-stretch`}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className={`card single_financial wow fadeIn${index === 0 ? "Left" : index === 2 ? "Right" : "Up"}`} data-wow-delay=".2s">
                <img src={donation.image} className="card-img-top" alt={donation.title} />
                <div className="card-body">
                  <h5 className="card-title text-start">
                    <a href={donation.link}>{donation.title}</a>
                  </h5>
                  <p className="card-text">
                    {donation.description} <a href={donation.link}>Read More</a>
                  </p>
                  <div className="online_donate text-center">
                    <a href={donation.donateLink}>Donate Online</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="button mt-4 text-center">
          <Link to='' className="btn">See All Financial Donation</Link>
        </div>
      </div>
    </section>
  );
};

export default FinancialDonation;
