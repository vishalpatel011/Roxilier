const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { month } = req.query;
  if (!month || !isValidMonth(month)) {
    return res.status(400).json({ message: 'Invalid month provided' });
  }
  // Your logic to fetch pie chart data
  const pieChartData = {
    "Category 1": 10,
    "Category 2": 20,
    "Category 3": 30
  };
  res.json(pieChartData);
});

function isValidMonth(month) {
  const validMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return validMonths.includes(month);
}

module.exports = router;
