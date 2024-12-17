import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Replace with your backend URL

// Fetch transactions with pagination and search
export const fetchTransactions = (month, search = "", page = 1) => {
  return axios.get(`${BASE_URL}/transactions`, {
    params: { month, search, page },
  });
};

// Fetch statistics
export const fetchStatistics = (month) => {
  return axios.get(`${BASE_URL}/statistics`, { params: { month } });
};

// Fetch bar chart data
export const fetchBarChart = (month) => {
  return axios.get(`${BASE_URL}/bar-chart`, { params: { month } });
};
