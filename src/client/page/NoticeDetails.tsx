import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust import path if necessary
import { fetchPublicNotices } from "@/redux/slices/publicSlice";
import { useEffect, useState } from "react";
import { File } from "lucide-react";
import DataTable from "react-data-table-component";

// Define the type for notices
interface Notice {
  id: number;
  title: string;
  date: string;
  pdf: string;
}

const NoticeDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notices, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public
  );

  const [searchText, setSearchText] = useState<string>(""); // State for search input
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]); // State for filtered notices

  useEffect(() => {
    dispatch(fetchPublicNotices({})); // Fetch notices on component mount
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(notices?.data)) {
      // Filter notices based on the search text
      const filteredData = notices.data.filter((notice: Notice) =>
        notice.title.toLowerCase().includes(searchText.toLowerCase()) ||
        notice.date.includes(searchText)
      );
      setFilteredNotices(filteredData);
    }
  }, [searchText, notices]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error}</p>;

  // Define the columns for DataTable
  const columns = [
    {
      name: "No",
      selector: (row: Notice) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row: Notice) => row.title,
      sortable: true,
    },
    {
      name: "Post Date",
      selector: (row: Notice) => row.date,
      sortable: true,
    },
    {
      name: "Download",
      cell: (row: Notice) => (
        <a href={row.pdf} target="_blank" rel="noopener noreferrer">
          <File />
        </a>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="notice-details ">
      <div className="container">

        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                .
              </h2>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                Notice Board
              </h2>
            </div>
          </div>
        </div>

        {/* Search input field */}
        <div className="row mb-3">
          <div className="col-12">
            <input
              type="text"
              className="form-control search-box"
              placeholder="Search by title or date"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)} // Update search text on input change
              style={{
                border: "2px solid #ced4da",
                borderRadius: "4px",
                padding: "10px",
                fontSize: "16px",
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card p-4 mb-5">
              <DataTable
                columns={columns}
                data={filteredNotices} // Use filtered data instead of original data
                pagination
                highlightOnHover
                striped
                responsive
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetails;
