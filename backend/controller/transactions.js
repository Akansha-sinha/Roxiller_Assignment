const Transaction = require('../model/transactions');

const getTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;

  try {
    const startOfMonth = new Date(`2024-${month}-01`);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

    let query = {
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth }
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: search }
      ];
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

module.exports = { getTransactions };
