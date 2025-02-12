const express = require("express");
const axios = require("axios");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");

    if (!response.data || response.data.length === 0) {
      return res.status(400).json({ message: "No data found in API" });
    }

    console.log("✅ API Data Fetched Successfully:", response.data.length, "records");

    // Clear existing collection
    await Transaction.deleteMany({});
    console.log("✅ Old Transactions Deleted");

    // Insert new transactions
    await Transaction.insertMany(response.data);
    console.log("✅ Inserted Transactions Count:", response.data.length);

    res.json({ message: "Database initialized successfully" });
  } catch (error) {
    console.error("❌ Seeding Failed:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
