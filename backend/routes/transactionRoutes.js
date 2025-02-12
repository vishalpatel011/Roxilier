const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;
    
    let query = {};
    if (month) {
      query.$expr = {
        $eq: [{ $month: '$dateOfSale' }, parseInt(new Date(`${month} 1`).getMonth() + 1)]
      };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: isNaN(search) ? undefined : Number(search) }
      ].filter(Boolean);
    }

    const skip = (page - 1) * perPage;
    
    const transactions = await Transaction.find(query)
      .skip(skip)
      .limit(parseInt(perPage))
      .sort({ dateOfSale: -1 });

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      totalPages: Math.ceil(total / perPage),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
