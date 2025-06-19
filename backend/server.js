
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.route.js');

const app = express();

app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});