require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorHandler');

// Initialize DB
connectDB();

const app = express();

// Security & Logging Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies

// Route Imports
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/contracts', require('./routes/contractRoutes'));

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));