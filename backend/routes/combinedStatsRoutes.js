const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { month } = req.query;

    // Convert month name to numeric value
    const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
    if (!month || isNaN(monthIndex)) {
      return res.status(400).json({ message: "Invalid month provided" });
    }

    // Filter for transactions in the given month
    const filter = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] },
    };

    // Get total sales amount, sold & unsold items
    const salesData = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
          totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalUnsoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },
        },
      },
    ]);

    // Get category-wise distribution
    const categoryDistribution = await Transaction.aggregate([
      { $match: filter },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Format response
    const response = {
      totalSaleAmount: salesData[0]?.totalSaleAmount || 0,
      totalSoldItems: salesData[0]?.totalSoldItems || 0,
      totalUnsoldItems: salesData[0]?.totalUnsoldItems || 0,
      categoryDistribution: {},
    };

    categoryDistribution.forEach(({ _id, count }) => {
      response.categoryDistribution[_id] = count;
    });

    res.json(response);
  } catch (error) {
    console.error("Error fetching combined statistics:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

module.exports = router;
