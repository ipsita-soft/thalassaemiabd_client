import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPublicPublication } from "@/redux/slices/publicSlice";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const lineClamp = (lines: number): CSSProperties => ({
  display: "-webkit-box",
  WebkitLineClamp: lines.toString(),
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const PublicationSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { meta, pubPublications, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false); // New state for search loading

  // Fetch publications on initial load and when search term changes
  useEffect(() => {
    setIsSearching(true); // Set searching state to true
    dispatch(fetchPublicPublication({ search: searchTerm }))
      .finally(() => setIsSearching(false)); // Reset searching state when fetch is complete
  }, [dispatch, searchTerm]);

  const handlePageChange = (page: number) => {
    dispatch(fetchPublicPublication({ page, search: searchTerm }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const publicationData = Array.isArray(pubPublications?.data) ? pubPublications.data : [];

  return (
    <div className="publication section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 mb-3">
            <div className="single-news wow fadeInUp mt-14" data-wow-delay=".2s">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h2 className="wow fadeInUp" data-wow-delay=".7s">Publication</h2>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <input
                    type="text"
                    placeholder="Search publications..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Show loading state for search */}
              {(isLoading || isSearching) && (
                <div className="text-center">
                  <p>Loading publications...</p>
                </div>
              )}

              {isError ? (
                <p>Error: {error}</p>
              ) : (
                <div className="row">
                  {publicationData.length > 0 ? (
                    publicationData.map((pub, index) => (
                      <div key={index} className="col-lg-6 col-md-6 col-12 pb-2">
                        <div className="card mb-3">
                          <div className="row g-0">
                            <div className="col-md-4">
                              <img
                                src={pub?.image || "assets/images/publication/01.png"}
                                className="img-fluid rounded-start"
                                alt="Publication"
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title text-red-600" style={{ fontSize: "16px", fontWeight: "bold" }}>
                                  <Link to={`/publication-details/${pub?.id}`}>{pub?.title || "Publication Title"}</Link>
                                </h5>
                                <p className="card-text" style={{ ...lineClamp(14), textAlign: "justify" }}>
                                  {pub?.description ? (
                                    <div dangerouslySetInnerHTML={{ __html: pub.description }} />
                                  ) : (
                                    "This is a wider card with supporting text below as a natural lead-in to additional content."
                                  )}
                                </p>
                              </div>
                            </div>
                            <Link className="text-end p-2 text-green-600" to={`/publication-details/${pub?.id}`}>Read More</Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <p>No publications found for the search term "{searchTerm}".</p>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination Section */}
              <div className="row mt-3">
                <div className="mt-4 flex justify-between items-center">
                  <div className="font-medium">
                    Showing {meta?.from} to {meta?.to} of {meta?.total} entries
                  </div>
                  <div className="flex-right">
                    {meta?.links.map((link) => (
                      <Button
                        key={link.label}
                        onClick={() => {
                          if (link.url) {
                            const page = new URL(link.url).searchParams.get("page");
                            if (page) handlePageChange(Number(page));
                          }
                        }}
                        disabled={!link.url}
                        className={`mr-1 ${link.active ? 'underline bg-slate-400' : ''} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {link.label
                          .replace(/&laquo;/g, '<<')
                          .replace(/&raquo;/g, '>>')
                          .trim()}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationSection;
