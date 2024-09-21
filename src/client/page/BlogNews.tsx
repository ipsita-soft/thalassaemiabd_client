
const blogData = [
  {
    id: 1,
    title: "Hereditary disease thalassemia",
    image: "client/assets/images/blog/blog1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua...",
    link: "https://www.prothomalo.com/bangladesh/0p8pbcqjf6",
    target: "_blank",
  },
  {
    id: 2,
    title: "The right program is needed",
    image: "client/assets/images/blog/blog2.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua...",
    link: "https://www.prothomalo.com/bangladesh/0p8pbcqjf6",
    target: "_blank",
  },
  {
    id: 3,
    title: "Prevention of thalassemia",
    image: "client/assets/images/blog/blog3.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua...",
    link: "client/assets/images/pdf/Features.pdf",
    target: "_blank",
  },
];

const BlogNews = () => {
  return (
    <section id="about-boxes" className="about-boxes">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Our Blog & News</h2>
            </div>
          </div>
        </div>

        <div className="row wow fadeInUp" data-wow-delay=".2s">
          {blogData.map((blog, index) => (
            <div
              key={blog.id}
              className="col-lg-4 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="card">
                <img src={blog.image} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                  <h5 className="card-title text-start">
                    <a href={blog.link} target={blog.target}>
                      {blog.title}
                    </a>
                  </h5>
                  <p className="card-text" style={{ textAlign: "justify" }}>
                    {blog.description} <a href="#">Read More</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button mt-4 text-center">
          <button className="btn">See More All News</button>
        </div>
      </div>
    </section>
  );
};

export default BlogNews;
