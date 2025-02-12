const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1`).getMonth() + 1;

    const query = {
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
    };

    const [totalSales] = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    const soldItems = await Transaction.countDocuments({ ...query, sold: true });
    const notSoldItems = await Transaction.countDocuments({ ...query, sold: false });

    res.json({
      totalSales: totalSales?.total || 0,
      soldItems,
      notSoldItems
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
