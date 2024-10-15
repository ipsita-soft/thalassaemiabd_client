import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust the import path as per your store location
import { fetchWishers } from "@/redux/slices/publicSlice";


interface Wisher {
  id: number;
  image: string;
  title?: string; // title is optional based on your data
}


const Wishers: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  // Adjust the selector to properly match the state structure
  const { wishers, isLoading, isError, error } = useSelector((state: RootState) => state.public);

  useEffect(() => {
    dispatch(fetchWishers({}));  // Fetch sliders on mount
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;  // Show loading state
  }

  if (isError) {
    return <p>Error: {error}</p>;  // Show error message if any
  }

  // Access the data array from sliders
  const wishersData: Wisher[] = Array.isArray(wishers.data) ? wishers.data : [];

  console.log(wishersData);


  return (
    <section id="section" className="clients_section">
      <div className="container">
        <div className="section-title mt-5">
          <h2>Wishers</h2>
        </div>
        <div className="row">
          <div className="col-md-12 client_bg">
            <div className="clients_slide">
              <div className="slide-track">
                {wishersData.map((wisher) => (
                  <div key={wisher.id} className="slide2">
                    <img src={wisher.image} alt={`Wisher ${wisher.id}`} />
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
