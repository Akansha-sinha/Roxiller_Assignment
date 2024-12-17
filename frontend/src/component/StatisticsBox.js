import React, { useState, useEffect } from "react";
import axios from "axios";

const StatisticsBox = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    soldItems: 0,
    notSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/statistics?month=${selectedMonth}`
      );
      setStatistics(response.data);
    };
    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div>
      <h2>Statistics for {selectedMonth}</h2>
      <p>Total Sale: {statistics.totalSale}</p>
      <p>Total Sold Items: {statistics.soldItems}</p>
      <p>Total Not Sold Items: {statistics.notSoldItems}</p>
    </div>
  );
};

export default StatisticsBox;
