const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// Route to get car data by ID
app.get('/api/car/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://www.freetestapi.com/api/v1/cars/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching car data:', error.message);
    res.status(500).json({ error: 'Error fetching car data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
