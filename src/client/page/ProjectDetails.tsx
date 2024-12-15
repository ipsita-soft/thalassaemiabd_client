import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'; // Update path as necessary
import { fetchSingleProject } from '@/redux/slices/publicSlice'; // Import the thunk
import './styles/SingleEvent.css'; 

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get event ID from URL
  const dispatch = useDispatch<AppDispatch>();

  // Access event data from Redux state
  const { singleProject, isLoading, isError, error } = useSelector((state: RootState) => state.public);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProject(id)); // Fetch event by ID
    }
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (isError) return <p className="text-danger text-center">Error: {error}</p>;

  if (!singleProject) return <p className="text-center">No Project found.</p>;

  return (
    <section className="single-event-section mt-14 section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow">
              <img src={singleProject.image} alt={singleProject.title} className="card-img-top img-fluid"/>
              <div className="card-body">
                <h2 className="card-title text-destructive">{singleProject.title}</h2>
               
                <div className="event-description">
                  <p className="card-text" dangerouslySetInnerHTML={{ __html: singleProject.description }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
