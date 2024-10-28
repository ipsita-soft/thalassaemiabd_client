const Thalassemia = () => {
  return (
    <section className="about-us section">
      <div className="container">
        <div className="row align-items-center">
          {/* First Section - Thalassemia */}
          <div className="col-lg-6 col-md-12 col-12">
            <div className="content-left wow fadeInLeft" data-wow-delay=".3s">
              <img src="client/assets/images/financial/blood2.jpg" alt="Thalassemia Overview" />
              <a href="https://www.youtube.com/embed/ir72Qf-x6rQ" className="glightbox video">
                <i className="lni lni-play"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12">
            <div className="content-right wow fadeInRight" data-wow-delay=".5s">
              <h2>What is thalassemia?</h2>
              <p>
                Thalassemia is an inherited blood disorder that causes the body to produce less hemoglobin,
                the protein in red blood cells that helps them carry oxygen from the lungs to all parts of the
                body. Hemoglobin is made up of four parts: two alpha proteins and two beta proteins.
                Thalassemia affects one or more of the genes that produce these proteins.
              </p>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <ul className="list">
                    <li><i className="lni lni-checkbox"></i>Inherited blood disorder</li>
                    <li><i className="lni lni-checkbox"></i>Low hemoglobin levels</li>
                    <li><i className="lni lni-checkbox"></i>Red blood cell damage</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-12">
                  <ul className="list">
                    <li><i className="lni lni-checkbox"></i>Fatigue and weakness</li>
                    <li><i className="lni lni-checkbox"></i>Frequent blood transfusions</li>
                    <li><i className="lni lni-checkbox"></i>Iron overload complications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row align-items-center">
          {/* Second Section - Haemoglobinopathies */}
          <div className="col-lg-8 col-md-8 col-12 wow fadeInLeft" data-wow-delay=".3s">
            <div className="content-thalass">
              <h2>About haemoglobinopathies</h2>
              <p>
                Haemoglobin disorders or haemoglobinopathies are a group of conditions affecting the human
                blood – more specifically an important substance or protein called haemoglobin contained in
                the red blood cells, hence the name haemoglobin disorders or haemoglobinopathies.
              </p>
              <p>
                Haemoglobin is a protein that consists of the alpha (α) and beta (β) parts or chains, which
                are in turn produced by the α-globin genes and β-globin genes respectively. Hence, the
                diseases caused by haemoglobin abnormality are divided into α-chain diseases (or α-globin
                gene diseases) such as α-thalassaemia, and β-chain (β-globin gene) diseases such as
                β-thalassaemia major and sickle cell disease.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12">
            <div className="content-thalass wow fadeInRight" data-wow-delay=".3s">
              <img className="img-fluid" src="client/assets/images/financial/thalas.jpg" alt="Haemoglobinopathies Overview" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thalassemia;
