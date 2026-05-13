const express = require('express');
const cors = require('cors');

const rideRoutes = require('./routes/rideRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('QuickSeeva Backend Running');
});

app.use('/api/rides', rideRoutes);

module.exports = app;