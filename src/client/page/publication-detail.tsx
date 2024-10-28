import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchPublicationDetail, fetchPublicPublication } from '@/redux/slices/publicSlice';

const PublicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Selectors to access publication details and related publications
  const { publicationDetail, isLoading, isError, error, pubPublications } = useSelector((state: RootState) => state.public);

  // Fetch publication details by ID
  useEffect(() => {
    if (id) {
      dispatch(fetchPublicationDetail(id));
    }
  }, [dispatch, id]);

  // Fetch related public publications
  useEffect(() => {
    dispatch(fetchPublicPublication({ 'per_page': 8 }));
  }, [dispatch]);
  const publicationData = Array.isArray(pubPublications?.data) ? pubPublications.data : [];

  // Loading and error handling
  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-danger text-center">Error: {error}</p>;
  if (!publicationDetail) return <p className="text-center">No publication found.</p>;

  return (
    <section className="section publication-detail">
      <div className="container">


        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp mt-14" data-wow-delay=".7s">Publication</h2>
            </div>
          </div>
        </div>



        <div className="row">

          <div className="col-lg-5 col-md-5">
            <div className="publication-img shadow">
              <img
                src={publicationDetail.image || 'assets/images/publication/default.png'} // Fallback image
                className="img-fluid rounded-start"
                alt={publicationDetail.title}
              />
            </div>
          </div>
          <div className="col-lg-7 col-md-7">
            <div className="publication-content">
              <h4 className="pub-title">Publication</h4>
              <h2>{publicationDetail.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: publicationDetail.description }} />
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <h2 className="re-title">Related Articles</h2>
          {publicationData?.map((article, index) => (
            <div key={index} className="col-lg-3 col-md-3 col-12">
              <div className="re-article">
                <div className="card">
                  <img
                    src={article.image || 'assets/images/publication/default.png'} // Fallback image
                    className="card-img-top"
                    alt={article.title}
                  />
                  <div className="card-body">
                    <h5>{article.title}</h5>
                  </div>

                  <Link className="text-end p-2 text-green-600" to={`/publication-details/${article?.id}`}>Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationDetail;
