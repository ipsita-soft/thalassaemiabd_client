import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchCommitteeDetail } from '@/redux/slices/publicSlice'; // Import the thunk
import './styles/SingleEvent.css';

const CommitteeDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get event ID from URL
  const dispatch = useDispatch<AppDispatch>();

  interface CommitteeDetail {
    image: string;
    name: string;
    designation: string;
    description: string;
  }


  const { committeeDetail, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public as { committeeDetail: CommitteeDetail | null; isLoading: boolean; isError: boolean; error: string }
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchCommitteeDetail(id)); // Fetch event by ID
    }
  }, [dispatch, id]);



  console.log(committeeDetail);

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (isError) return <p className="text-danger text-center">Error: {error}</p>;

  if (!committeeDetail) return <p className="text-center">No event found.</p>;

  return (
    <section className="committee-details section">
      <div className="container">
        <div className="inner">
          <div className="row mt-16">
            <div className="col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-12">

                  <div className="image">
                    <img src={committeeDetail?.image} alt="#" />
                  </div>

                  <div className="doctor-left-bar">
                    <div className="single-bar">
                      <h4>{committeeDetail?.name}</h4>
                      <p>{committeeDetail?.designation}</p>
                    </div>
                  </div>

                </div>

                <div className="col-lg-8 col-md-8 col-12">
                  <div className="content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: committeeDetail?.description ? committeeDetail.description : '',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitteeDetails;
