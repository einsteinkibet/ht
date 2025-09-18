import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.js';

const app = express();
app.use(cors());
app.use(express.json());

// Debug logging
console.log('Health routes type:', typeof healthRoutes);
console.log('Health routes:', healthRoutes);

app.use('/api/health', healthRoutes);

// Test route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
