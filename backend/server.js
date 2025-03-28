const express = require("express");
const axios = require("axios");
require('dotenv').config();

const app = express();
const port = 3002;

// ✅ Load JWT Token from .env
const jwtToken = process.env.JWT_TOKEN

if (!jwtToken) {
  console.error("❌ JWT Token is missing! Please set JWT_TOKEN in .env file.");
  process.exit(1);
}

// ✅ CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ✅ نمبر پلیٹ ڈیٹا حاصل کرنے کا API
app.get("/api/numberplate/:state/:numberplate", async (req, res) => {
  try {
    const { state, numberplate } = req.params;

    if (!state || !numberplate) {
      return res.status(400).json({ message: "State and Number Plate are required." });
    }

    console.log(`Fetching data for number plate: ${numberplate} in state: ${state}`);

    const response = await axios.get(
      `https://carapi.app/api/license-plate?country_code=US&region=${state}&lookup=${numberplate}`,
      { headers: { Authorization: `Bearer ${jwtToken}`, Accept: "application/json" } }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching number plate data:", error.response ? error.response.data : error.message);

    res.status(error.response?.status || 500).json({
      message: "Error fetching number plate data",
      error: error.response?.data || error.message,
    });
  }
});

// ✅ Bodies Data API
app.get("/api/bodies", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    console.log(`Fetching bodies data from page: ${page}`);

    const response = await axios.get("https://carapi.app/api/bodies", {
      headers: { Authorization: `Bearer ${jwtToken}`, Accept: "application/json" }
    });

    const data = response.data.data;

    if (!Array.isArray(data)) {
      throw new Error("Expected data to be an array");
    }

    const paginatedData = data.slice(offset, offset + limit);

    res.json({
      data: paginatedData,
      collection: {
        pages: Math.ceil(data.length / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching bodies data:", error.response ? error.response.data : error.message);

    res.status(error.response?.status || 500).json({
      message: "Error fetching bodies data",
      error: error.response?.data || error.message,
    });
  }
});

// ✅ سرور اسٹارٹ کرو
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
