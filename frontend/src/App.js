import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import StatisticsBox from "./components/StatisticsBox";
import BarChart from "./components/BarChart";
import "./index.css";

const App = () => {
  const [month, setMonth] = useState("June");

  return (
    <div className="app-container">
      <h1>Transaction Dashboard</h1>
      <select onChange={(e) => setMonth(e.target.value)} value={month}>
        {["January", "February", "March", "April", "May", "June"].map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <TransactionsTable selectedMonth={month} />
      <StatisticsBox selectedMonth={month} />
      <BarChart selectedMonth={month} />
    </div>
  );
};

export default App;