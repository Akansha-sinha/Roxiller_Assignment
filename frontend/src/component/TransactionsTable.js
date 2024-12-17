import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/transactions?month=${selectedMonth}&search=${search}&page=${page}`
      );
      setTransactions(response.data.transactions);
    };
    fetchTransactions();
  }, [selectedMonth, search, page]);

  return (
    <div>
      <h2>Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.title}</td>
              <td>{tx.description}</td>
              <td>${tx.price}</td>
              <td>{tx.category}</td>
              <td>{tx.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default TransactionsTable;
