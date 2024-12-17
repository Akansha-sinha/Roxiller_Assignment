const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// MongoDB Connection
const dbName = 'mern_stack_challenge';  // Specify the correct DB name directly
const collectionName = 'transactions';  // Specify the collection name
mongoose.connect(`mongodb://localhost:27017/mern_stack_challenge/transactions`, {      
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
  console.log(`Connected to MongoDB Database: ${dbName}`);
  console.log(`Using Collection: ${collectionName}`);
});

// Define Schema and Model
const transactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  sold: Boolean,
  image: String,
  dateOfSale: Date,
});

const Transaction = mongoose.model("Transaction", transactionSchema, collectionName);

// API 1: Initialize Database
// app.get("/api/initialize", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
//     );
//     await Transaction.deleteMany(); // Clear database
//     await Transaction.insertMany(response.data); // Seed data
//     console.log("Database initialized with data:", response.data);
//     res.json({ message: "Database initialized successfully" });
//   } catch (error) {
//     console.error("Error initializing database:", error);
//     res.status(500).json({ error: "Failed to initialize database" });
//   }
// });

// API 2: List Transactions (with Search and Pagination)
app.get("/api/transactions", async (req, res) => {
  const { page = 1, perPage = 10, search = "", month } = req.query;
  const monthPattern = new RegExp(`^${month}`, 'i'); // Regex for month matching
  const query = {
    dateOfSale: { $regex: monthPattern },
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { price: isNaN(search) ? 0 : Number(search) },
    ],
  };

  try {
    console.log("Query:", query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    const total = await Transaction.countDocuments(query);
    console.log("Fetched transactions:", transactions);
    res.json({ transactions, total });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// API 3: Statistics
app.get("/api/statistics", async (req, res) => {
  const { month } = req.query;
  try {
    const transactions = await Transaction.find({
      dateOfSale: { $regex: month, $options: "i" },
    });
    const totalSale = transactions.reduce((acc, t) => acc + t.price, 0);
    const soldItems = transactions.filter((t) => t.sold).length;
    const notSoldItems = transactions.filter((t) => !t.sold).length;
    console.log("Fetched statistics:", { totalSale, soldItems, notSoldItems });
    res.json({ totalSale, soldItems, notSoldItems });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// API 4: Bar Chart Data
app.get("/api/bar-chart", async (req, res) => {
  const { month } = req.query;
  const ranges = [
    { label: "0-100", min: 0, max: 100 },
    { label: "101-200", min: 101, max: 200 },
    { label: "201-300", min: 201, max: 300 },
    { label: "301-400", min: 301, max: 400 },
    { label: "401-500", min: 401, max: 500 },
    { label: "501-600", min: 501, max: 600 },
    { label: "601-700", min: 601, max: 700 },
    { label: "701-800", min: 701, max: 800 },
    { label: "801-900", min: 801, max: 900 },
    { label: "901 above", min: 901 },
  ];

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $regex: month, $options: "i" },
    });
    const chartData = ranges.map((range) => ({
      range: range.label,
      count: transactions.filter(
        (t) => t.price >= range.min && (!range.max || t.price <= range.max)
      ).length,
    }));
    console.log("Fetched bar chart data:", chartData);
    res.json(chartData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Failed to fetch bar chart data" });
  }
});

app.post('/api/add-transaction', async (req, res) => {
  const newTransaction = new Transaction({
    id: '675d60d01d7cc9b10e9b36b1',
    dateOfSale: '2021-10-27T14:59:54.000+00:00',
    title: 'Rohit Anish',
    description: 'The color could be slightly different between on the screen and in practice.',
    price: 31.98,
    category: "men's clothing",
    sold: false,
    __v: 0,
  });

  try {
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
