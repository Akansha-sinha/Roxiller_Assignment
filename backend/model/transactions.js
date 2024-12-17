const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  sold: { type: Boolean, required: true },
  image: { type: String },
  dateOfSale: { type: Date, required: true }
});

module.exports = mongoose.model('mern_stack_challenge', TransactionSchema);
