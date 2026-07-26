const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const routes = require('./routes');

const app = express();

// Seguridad
app.use(helmet());

// CORS
app.use(cors({
origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
credentials: true
}));

// Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
app.use(morgan('combined'));
}

// Rutas
app.use('/api', routes);

// Health Check
app.get('/health', (req, res) => {
res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
});
});

// Error Handler
app.use((err, req, res, next) => {
console.error(err.stack);

res.status(500).json({
    error: 'Something went wrong!',
    message:
    process.env.NODE_ENV === 'development'
        ? err.message
        : 'Internal server error'
});
});

// 404
app.use('*', (req, res) => {
res.status(404).json({
    error: 'Route not found'
});
});

module.exports = app;