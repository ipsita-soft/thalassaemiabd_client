import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSingleBlogNews } from '@/redux/slices/publicSlice'; // Import the thunk
import './styles/SingleEvent.css';

const SingleBlogNews = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { singleBlogNews, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBlogNews(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center my-5">Loading...</p>;

  if (isError) return <p className="text-danger text-center my-5">Error: {error}</p>;

  if (!singleBlogNews) return <p className="text-center my-5">No Data found.</p>;

  return (
    <section className="single-blog-news-section mt-14 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg">
              <img
                src={singleBlogNews.image}
                alt={singleBlogNews.title}
                className="card-img-top rounded-top"
              />
              <div className="card-body">
                <h2 className="card-title fw-bold mt-2 mb-3">
                  {singleBlogNews.title}
                </h2>
              
                <div className="blog-description">
                  <p
                    className="card-text text-justify"
                    dangerouslySetInnerHTML={{ __html: singleBlogNews.description }}
                  ></p>
                </div>
              </div>
              <div className="card-footer text-center bg-light py-3">
                <small className="text-muted">##</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogNews;
