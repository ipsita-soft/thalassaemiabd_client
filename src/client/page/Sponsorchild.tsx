import React, { useState } from "react";

type PaymentMethod = "bkash" | "nagad" | "rocket" | "ibbl";

interface User {
  btsid: string;
  name: string;
  image: string;
  description: string;
}

const SponsorChild = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("bkash");
  const [btsidSearch, setBtsidSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUserBtsid, setSelectedUserBtsid] = useState<string | null>(
    null
  );

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

  const accountNumbers: Record<PaymentMethod, string> = {
    bkash: "01705963592 Personal /Send Money",
    nagad: "018XXXXXXXX Personal /Send Money",
    rocket: "019XXXXXXXX Personal /Send Money",
    ibbl: "Account No: 5020 4637 4857 4324, Routing No: 223344, Branch: Dhanmondi sub-branch.",
  };

  const users: User[] = [
    {
      btsid: "BTS123",
      name: "John Doe",
      image: "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png",
      description: "A short description of John Doe.",
    },
    {
      btsid: "BTS456",
      name: "Jane Smith",
      image: "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png",
      description: "A short description of Jane Smith.",
    },
    {
      btsid: "BTS789",
      name: "Alice Johnson",
      image: "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png",
      description: "A short description of Alice Johnson.",
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setBtsidSearch(searchTerm);

    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      const filteredUsers = users.filter((user) =>
        user.btsid.toLowerCase().includes(searchTerm)
      );
      setSearchResults(filteredUsers);
    }
  };

  const handleUserSelect = (btsid: string) => {
    setSelectedUserBtsid(btsid);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedUserBtsid) {
      alert("Please search and select a user before submitting.");
      return;
    }

    const formData = {
      btsid: selectedUserBtsid,
      paymentMethod: selectedMethod,
    };

    console.log("Form Submitted", formData);
    alert("Donation submitted successfully!");
  };

  return (
    <section className="financial-donation mt-14 section">
      <div className="container">
        <div className="content">
          <div className="row">
            {/* User Search Section */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Search Child by User BTS-ID</h5>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter BTSID"
                      value={btsidSearch}
                      onChange={handleSearch}
                    />
                  </div>

                  {/* Display search results */}
                  {searchResults.length > 0 ? (
                    <div>
                        {searchResults.map((user) => (
                            <label
                            key={user.btsid}
                            className="card p-3 mt-3 d-flex flex-row align-items-center shadow-sm border rounded"
                            style={{
                                backgroundColor: "#f8f9fa",
                                gap: "10px",
                                cursor: "pointer",
                            }}
                            >
                            <input
                                className="form-check-input me-3"
                                type="radio"
                                name="selectedUser"
                                value={user.btsid}
                                checked={selectedUserBtsid === user.btsid}
                                onChange={() => handleUserSelect(user.btsid)}
                                style={{
                                cursor: "pointer",
                                transform: "scale(1.5)", // Increase size of the radio button
                                }}
                            />
                            <img
                                src={user.image}
                                alt={user.name}
                                style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <h6
                                className="card-title mb-1"
                                style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
                                >
                                {user.name}
                                </h6>
                                <p
                                className="card-text mb-0"
                                style={{ fontSize: "14px", color: "#555" }}
                                >
                                {user.description}
                                </p>
                            </div>
                            </label>
                        ))}
                    </div>
                  ) : (
                    btsidSearch && (
                      <div className="alert alert-danger">
                        No Child found with User BTS-ID: {btsidSearch}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Donation Form Section */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="financial-form card shadow-lg border-0">
                <div className="card-body p-4 pt-3">
                  <h1
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    className="text-center text-light bg-danger rounded py-3 mb-4"
                  >
                    DONATE NOW
                  </h1>

                  <form onSubmit={handleSubmit}>
                      <div className="row">       

                      <div className="d-flex flex-wrap align-items-center gap-3">
                        {/* BKash */}
                        <label className="d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bkash"
                            onChange={(e) =>setSelectedMethod(e.target.value as PaymentMethod)}
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
                            onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
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
                            onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
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
                            onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
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
  );
};

export default SponsorChild;
