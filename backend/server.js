const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});