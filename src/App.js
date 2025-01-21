// Frontend: React.js with App.js as the entry point
import React, { useState, useEffect } from "react";
import "./App.css"; // Optional: Add custom CSS for styling

const App = () => {
  const [data, setData] = useState({}); // Grouped data by year and month
  const [selectedItem, setSelectedItem] = useState(null); // For detail view
  // const [formData, setFormData] = useState({}); // For Add/Edit forms

  useEffect(() => {
    // Fetch JSON data and group by year and month
    fetch("viewData.json")
      .then((response) => response.json())
      .then((json) => {
        const groupedData = json.data.reduce((acc, transaction) => {
          const date = new Date(transaction.transactionDate);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const key = `${year}-${month}`;

          if (!acc[key]) acc[key] = [];
          acc[key].push(transaction);

          return acc;
        }, {});
        setData(groupedData);
      });
  }, []);

  const handleAdd = () => {
    // Add new data logic here
    alert("Add new data");
  };

  const handleEdit = (item) => {
    // setFormData(item);
    alert("Edit data");
  };

  const handleViewDetail = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="App">
      <h1>Transaction Management</h1>

      {/* Grid Table */}
      <div className="grid-table">
        {Object.entries(data).map(([key, transactions]) => (
          <div key={key} className="year-month-group">
            <h2>{key.replace("-", " / ")}</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Amount</th>
                  <th>Customer Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.productName}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.customerName}</td>
                    <td>{transaction.status === 0 ? "SUCCESS" : "FAILED"}</td>
                    <td>
                      <button onClick={() => handleViewDetail(transaction)}>
                        View
                      </button>
                      <button onClick={() => handleEdit(transaction)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Add Data */}
      <div className="add-data">
        <h2>Add New Transaction</h2>
        <button onClick={handleAdd}>Add Data</button>
      </div>

      {/* View Detail */}
      {selectedItem && (
        <div className="detail-view">
          <h2>Transaction Detail</h2>
          <p>
            <strong>ID:</strong> {selectedItem.id}
          </p>
          <p>
            <strong>Product Name:</strong> {selectedItem.productName}
          </p>
          <p>
            <strong>Amount:</strong> {selectedItem.amount}
          </p>
          <p>
            <strong>Customer Name:</strong> {selectedItem.customerName}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {selectedItem.status === 0 ? "SUCCESS" : "FAILED"}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
