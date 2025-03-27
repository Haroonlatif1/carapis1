const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

// ✅ Hardcoded JWT Token (جو تم نے دیا تھا)
const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiNmJlMjE5ZTEtOWE1ZC00NDYwLTkyOWYtNzNkYWU5ZDM2MGVmIiwiYXVkIjoiNmJlMjE5ZTEtOWE1ZC00NDYwLTkyOWYtNzNkYWU5ZDM2MGVmIiwiZXhwIjoxNzQzNzA4NTUyLCJpYXQiOjE3NDMxMDM3NTIsImp0aSI6ImFkOGJjMzBhLTliNDEtNGU3My1iOWU4LTY5Y2QxNjhlYjE5ZCIsInVzZXIiOnsic3Vic2NyaXB0aW9ucyI6W10sInJhdGVfbGltaXRfdHlwZSI6ImhhcmQiLCJhZGRvbnMiOnsiYW50aXF1ZV92ZWhpY2xlcyI6ZmFsc2UsImRhdGFfZmVlZCI6ZmFsc2V9fX0.VemKPKbieDsrv77WYdsfgTEpCVceiDc9qFXaHJfCkXc";

// ✅ CORS Middleware (اگر فرنٹ اینڈ React/Angular/Vue سے کال کر رہے ہو)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ✅ نمبر پلیٹ ڈیٹا حاصل کرنے کا API
app.get("/api/numberplate/:state/:numberplate", async (req, res) => {
  try {
    const { state, numberplate } = req.params;

    // ✅ چیک کرو کہ state اور numberplate دی گئی ہے یا نہیں
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
// ✅ Bodies Data API
app.get("/api/bodies", async (req, res) => {
    try {
      const page = req.query.page || 1; // Optional page parameter
      const limit = 5; // Number of records per page
      const offset = (page - 1) * limit; // Calculate offset for pagination
  
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

// ✅ سرور اسٹارٹ کرو
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});