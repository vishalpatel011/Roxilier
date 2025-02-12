const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const seedRoutes = require('./routes/seedRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const statsRoutes = require('./routes/statsRoutes');
const barChartRoutes = require('./routes/barChartRoutes');  
const pieChartRoutes = require('./routes/PieChartRoutes');
const combinedStatsRoutes = require("./routes/combinedStatsRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected! ✅"))
  .catch(err => console.error("MongoDB Connection Failed: ❌", err));

// Routes
app.use('/api/seed', seedRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/bar-chart', barChartRoutes);
app.use('/api/pie-chart', pieChartRoutes);
app.use("/api/combinestats", combinedStatsRoutes);

// API route
app.get("/", (req, res) => res.send("API is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
