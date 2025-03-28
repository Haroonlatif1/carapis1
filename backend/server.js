const express = require('express');
const axios = require('axios');

const app = express();

const api_url = 'https://api.api-ninjas.com/v1/cars';
const api_key = 'APIZDkTe6uq2idnclXON+A==74LYp2QeX3KDLxAP';

app.get('/cars/:model', async (req, res) => {
  const model = req.params.model;
  const params = { model: model };
  const headers = { 'X-Api-Key': api_key };

  try {
    const response = await axios.get(api_url, { params, headers });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});