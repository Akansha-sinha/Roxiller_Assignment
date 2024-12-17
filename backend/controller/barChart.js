const getBarChartStats = async (req, res) => {
    const { month } = req.query;
  
    const startOfMonth = new Date(`2024-${month}-01`);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
  
    try {
      const priceRanges = [
        { label: '0-100', min: 0, max: 100 },
        { label: '101-200', min: 101, max: 200 },
        { label: '201-300', min: 201, max: 300 },
        { label: '301-400', min: 301, max: 400 },
        { label: '401-500', min: 401, max: 500 },
        { label: '501-600', min: 501, max: 600 },
        { label: '601-700', min: 601, max: 700 },
        { label: '701-800', min: 701, max: 800 },
        { label: '801-900', min: 801, max: 900 },
        { label: '901-above', min: 901, max: Infinity }
      ];
  
      const stats = await Promise.all(
        priceRanges.map(async (range) => {
          const count = await Transaction.countDocuments({
            dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
            price: { $gte: range.min, $lte: range.max }
          });
          return { range: range.label, count };
        })
      );
  
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bar chart data', error });
    }
  };
  
  module.exports = { getBarChartStats };
  