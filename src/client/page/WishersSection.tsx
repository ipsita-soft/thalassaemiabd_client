import './Wishers.css'; 
const Wishers = () => {
  const wisherImages = [
    'client/assets/images/wishers/01.jpg',
    'client/assets/images/wishers/02.jpg',
    'client/assets/images/wishers/03.jpg',
    'client/assets/images/wishers/04.jpg',
    'client/assets/images/wishers/05.jpg',
    'client/assets/images/wishers/06.jpg',
    'client/assets/images/wishers/08.jpg',
    'client/assets/images/wishers/09.jpg',
    'client/assets/images/wishers/04.jpg',
    'client/assets/images/wishers/06.jpg',
    'client/assets/images/wishers/08.jpg',
  ];

  return (
    <section id="section" className="clients_section">
      <div className="container">
        <div className="section-title mt-5">
          <h2>Wishers</h2>
        </div>
        <div className="row cllient_bg">
          <div className="col-md-12">
            <div className="clients_slide">
              <div className="slide-track">
                {wisherImages.map((image, index) => (
                  <div key={index} className="slide">
                    <img src={image} className='img-fluid' alt={`wisher-${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishers;
