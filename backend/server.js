const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiYWQ1N2MyNmMtNWRiZC00ZDU3LWFjMDItZGE3YWJkZTFhZjZjIiwiYXVkIjoiYWQ1N2MyNmMtNWRiZC00ZDU3LWFjMDItZGE3YWJkZTFhZjZjIiwiZXhwIjoxNzQ0ODIyNDIzLCJpYXQiOjE3NDQyMTc2MjMsImp0aSI6Ijk3NjRkMTBiLTFiOGItNDY5Ni04ODkxLTRiNmZmMzdhM2UxYSIsInVzZXIiOnsic3Vic2NyaXB0aW9ucyI6WyJzdGFydGVyIl0sInJhdGVfbGltaXRfdHlwZSI6ImhhcmQiLCJhZGRvbnMiOnsiYW50aXF1ZV92ZWhpY2xlcyI6ZmFsc2UsImRhdGFfZmVlZCI6ZmFsc2V9fX0.p9KbI3JS2GKeY40YmYGWNI3pe2cBf4ZfcwUMjDbORug";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// License Plate Lookup API
app.get("/api/license-plate", async (req, res) => {
  try {
    const { country_code, lookup, region } = req.query;

    if (!country_code || !lookup) {
      return res.status(400).json({ 
        message: "country_code and lookup parameters are required" 
      });
    }

    // Validate country code (basic check)
    const validCountryCodes = ['US', 'CA', 'AU', 'UK', 'FR', 'IE', 'NZ', 'MX', 'DE', 'CZ', 'PT'];
    if (!validCountryCodes.includes(country_code.toUpperCase())) {
      return res.status(400).json({ 
        message: "Invalid country_code. Supported codes: US, CA, AU, UK, FR, IE, NZ, MX, DE, CZ, PT" 
      });
    }

    // Check if region is required for certain countries
    if (['US', 'CA', 'AU'].includes(country_code.toUpperCase()) && !region) {
      return res.status(400).json({ 
        message: "region parameter is required for US, CA, and AU country codes" 
      });
    }

    console.log(`Fetching data for license plate: ${lookup} in country: ${country_code}${region ? `, region: ${region}` : ''}`);

    // Build query parameters
    const params = new URLSearchParams();
    params.append('country_code', country_code);
    params.append('lookup', lookup);
    if (region) params.append('region', region);

    const response = await axios.get(
      `https://carapi.app/api/license-plate?${params.toString()}`,
      { 
        headers: { 
          Authorization: `Bearer ${jwtToken}`, 
          Accept: "application/json" 
        } 
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching license plate data:", error.response ? error.response.data : error.message);

    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      message: "Error fetching license plate data",
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

    const response = await axios.get(
      `https://carapi.app/api/bodies`,
      { headers: { Authorization: `Bearer ${jwtToken}`, Accept: "application/json" } }
    );

    const data = response.data.data; // Access the data array

    if (!Array.isArray(data)) {
      throw new Error("Expected data to be an array");
    }

    const paginatedData = data.slice(offset, offset + limit); // Paginate data

    res.json({
      data: paginatedData,
      collection: {
        pages: Math.ceil(data.length / limit), // Calculate total pages
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

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});