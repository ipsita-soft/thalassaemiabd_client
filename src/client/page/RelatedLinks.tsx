const links = [
    {
        id: 1,
        image: "",
        url: "https://prothomalo.com/",
        title: "Prothom Alo",
        description: "Link description here",
    },

    {
        id: 2,
        image: "",
        url: "https://prothomalo.com/",
        title: "Prothom Alo",
        description: "Link description here",
    },

    {
        id: 3,
        image: "",
        url: "https://prothomalo.com/",
        title: "Prothom Alo",
        description: "Link description here",
    },

  ];
  
  const defaultImage = "https://upload.wikimedia.org/wikipedia/bn/thumb/b/b3/%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A5%E0%A6%AE_%E0%A6%86%E0%A6%B2%E0%A7%8B%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg/640px-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A5%E0%A6%AE_%E0%A6%86%E0%A6%B2%E0%A7%8B%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg.png";
  
  const RelatedLinks = () => {
    return (
      <section className="about-us section mt-14">
        <div className="employee-list">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h2 className="wow fadeInUp" data-wow-delay=".7s">
                    Related Links
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card p-4  table-responsive-sm">
                  <div className="table-responsive">
                    <table
                      id="example"
                      className="table table-bordered text-center"
                      style={{ width: "100%" }}
                    >
                      <thead className="text-center">
                        <tr>
                          <th scope="col">SL No</th>
                          <th scope="col">Logo</th>
                          <th scope="col">Title</th>
                          <th scope="col">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {links.map((link, index) => (
                          <tr key={link.id}>
                            <th scope="row" className="em-list">
                              {index + 1}
                            </th>
                            <td>
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={link.image || defaultImage}
                                  alt={link.title}
                                  style={{
                                    width: "100px",
                                    height: "50px",
                                    margin: "auto",
                                  }}
                                />
                              </a>
                            </td>
                            <td className="em-list">{link.title}</td>
                            <td className="em-list">{link.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default RelatedLinks;
