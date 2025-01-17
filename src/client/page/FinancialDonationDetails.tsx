import { useEffect, useState  } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchSingleFinancialDonation,
  fetchFinancialDonation,
} from "@/redux/slices/publicSlice";
import { Link } from "react-router-dom";

const SingleDonation = () => {

  type PaymentMethod = "bkash" | "nagad" | "rocket" | "ibbl";

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("bkash");

  const accountNumbers: Record<PaymentMethod, string> = {
    bkash: "01705963592 Personal /Send Money",
    nagad: "018XXXXXXXX Personal /Send Money",
    rocket: "019XXXXXXXX Personal /Send Money",
    ibbl: "Account No: 5020 4637 4857 4324, Routing No: 223344, Branch: Dhanmondi sub-branch.",
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value as PaymentMethod);
  };


    const [paymentType, setPaymentType] = useState("");
    const [transactionLabel, setTransactionLabel] = useState("Transaction ID");
  
    const handlePaymentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedType = event.target.value;
      setPaymentType(selectedType);
  
      switch (selectedType) {
        case "1":
          setTransactionLabel("Cheque Number");
          break;
        case "2":
          setTransactionLabel("Online Transaction ID");
          break;
        case "3":
          setTransactionLabel("Bank Reference Number");
          break;
        default:
          setTransactionLabel("Transaction ID");
      }
    };


  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { singleFinancialdonation, isLoading, isError, error } = useSelector(
    (state: RootState) => state.public
  );

  const { financialdonations } = useSelector(
    (state: RootState) => state.public
  );

  useEffect(() => {
    dispatch(fetchFinancialDonation({}));
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleFinancialDonation(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center my-5">Loading...</p>;
  if (isError)
    return <p className="text-danger text-center my-5">Error: {error}</p>;
  if (!singleFinancialdonation)
    return <p className="text-center my-5">No data found.</p>;

  const donations = Array.isArray(financialdonations?.data)
    ? financialdonations.data
    : [];

  return (
    <>
      <section className="financial-donation mt-14 section">
        <div className="container">
          <div className="content">
            <div className="row">
              <div className="col-lg-6 col-md-7 col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="post-thumbnils">
                            <img
                                src={singleFinancialdonation.image}
                                alt={singleFinancialdonation.title}
                                className="rounded"
                            />
                        </div>
                        <div className="details-content">
                        <h5
                        className="card-title mt-3 text-start"
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "red",
                        }}
                      >
                       {singleFinancialdonation.title}
                      </h5>
                        <p className="mt-2" dangerouslySetInnerHTML={{ __html: singleFinancialdonation.description }} />
                        </div>
                    </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-5 col-12 order-2">
                <div className="financial-form card shadow-lg border-0">
                  <div className="card-body p-4 pt-3">
                    <h1 style={{ fontSize: "16px", fontWeight:"600" }} className="text-center text-light bg-danger rounded py-3 mb-4"> DONATE NOW </h1>
                    <form>
                      <div className="row">       

                      <div className="d-flex flex-wrap align-items-center gap-3">
                        {/* BKash */}
                        <label className="d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bkash"
                            onChange={handlePaymentChange}
                            checked={selectedMethod === "bkash"}
                          />
                          <img
                            className="img-fluid"
                            src="../client/assets/images/financial/bkashlogo.png"
                            alt="bkash"
                            style={{ width: "60px", height: "auto", cursor:"pointer" }}
                          />
                        </label>

                        {/* Nagad */}
                        <label className="d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="nagad"
                            onChange={handlePaymentChange}
                            checked={selectedMethod === "nagad"}
                          />
                          <img
                            className="img-fluid"
                            src="../client/assets/images/financial/nagadlogo.png"
                            alt="nagad"
                            style={{ width: "60px", height: "auto", cursor:"pointer" }}
                          />
                        </label>

                        {/* Rocket */}
                        <label className="d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="rocket"
                            onChange={handlePaymentChange}
                            checked={selectedMethod === "rocket"}
                          />
                          <img
                            className="img-fluid"
                            src="../client/assets/images/financial/rocketlogo.png"
                            alt="rocket"
                            style={{ width: "60px", height: "auto", cursor:"pointer" }}
                          />
                        </label>

                        {/* IBBL */}
                        <label className="d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="ibbl"
                            onChange={handlePaymentChange}
                            checked={selectedMethod === "ibbl"}
                          />
                          <img
                            className="img-fluid"
                            src="../client/assets/images/financial/ibbllogo.png"
                            alt="ibbl"
                            style={{ width: "60px", height: "auto", cursor:"pointer" }}
                          />
                        </label>
                      </div>

                      {/* Display account number */}
                      <div className="mt-4">
                        {selectedMethod && (
                          <div className="alert alert-info text-center font-bold" role="alert">
                          {accountNumbers[selectedMethod]}
                          </div>
                        )}
                      </div>

                        {/* Donation Type */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="donationType" className="form-label">
                            Donation Type
                          </label>
                          <select
                            id="donationType"
                            className="form-select"
                            aria-label="Select Donation Type"
                            required
                          >
                            <option value="" selected disabled>
                              Select Donation Type
                            </option>
                            <option value="1">General Donation</option>
                            <option value="2">Regular Donation</option>
                          </select>
                        </div>

                        {/* Payment Type */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="paymentType" className="form-label">
                            Payment Type
                            </label>
                            <select
                            id="paymentType"
                            className="form-select"
                            aria-label="Select Payment Type"
                            value={paymentType}
                            onChange={handlePaymentTypeChange}
                            required
                            >
                            <option value="" disabled>
                                Select Payment Type
                            </option>
                            <option value="1">Cheque</option>
                            <option value="2">Online Payment</option>
                            <option value="3">Bank Transfer</option>
                            </select>
                        </div>

                        {/* Amount */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="amount" className="form-label">
                            Amount (in BDT)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="amount"
                            placeholder="Enter amount"
                            required
                          />
                        </div>

                        {/* Transaction ID */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="transactionId" className="form-label">
                            {transactionLabel}
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            id="transactionId"
                            placeholder={`Enter ${transactionLabel.toLowerCase()}`}
                            required
                            />
                        </div>

                        {/* Donor Name */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="donorName" className="form-label">
                            Donor Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="donorName"
                            placeholder="Enter donor name"
                            required
                          />
                        </div>

                        {/* Donor Email */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="donorEmail" className="form-label">
                            Donor Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="donorEmail"
                            placeholder="Enter donor email"
                            required
                          />
                        </div>

                        {/* Phone Number */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="phoneNumber" className="form-label">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter phone number"
                            required
                          />
                        </div>

                        {/* Address */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="donorAddress" className="form-label">
                            Full Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="donorAddress"
                            placeholder="Enter donor address"
                            required
                          />
                        </div>

                        {/* Message */}
                        <div className="col-12 mb-3">
                          <label htmlFor="donorMessage" className="form-label">
                            Message
                          </label>
                          <textarea
                            className="form-control"
                            id="donorMessage"
                            placeholder="Enter your message"
                            rows={3}
                            required
                          ></textarea>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="button add-list-button mt-2 mb-3 pt-2 d-flex w-100 justify-content-center align-items-center">
                        <button type="submit" className="btn">
                          DONATE NOW
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* More donations section */}

      <section className="event-section other-donation ">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".5s">
                More Donations
              </h2>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="content">
            <div className="row">
              {donations.map((donation: any) => (
                <div className="col-lg-4 col-md-12 col-12" key={donation.id}>
                    <Link to={`/financial-donation-details/${donation.id}`}>
                        <div className="card">
                            <img
                            src={
                                donation.image || "assets/images/financial/zakat2.jpg"
                            }
                            className="card-img-top img-fluid"
                            alt={donation.title}
                            />
                            <div className="card-body">
                            <h5
                                className="card-title text-start"
                                style={{
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "red",
                                }}
                            >
                                <Link to={`/financial-donation-details/${donation.id}`}>
                                {donation.title}
                                </Link>
                            </h5>

                            <p className="mt-2" dangerouslySetInnerHTML={{ __html: donation.description.substring(0, 200) }} />


                            <div className="donate_now text-center">
                                <Link to={`/financial-donation-details/${donation.id}`}>
                                Donate Now
                                </Link>
                            
                            </div>
                            </div>
                        </div>
                    </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleDonation;
