const mongoose = require('mongoose');
const { collection } = require('../model/transactions');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected...');
    const count=await collection.countDocuments();
    console.log(count);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
