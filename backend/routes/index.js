const express = require('express');

const router = express.Router();
const authRoutes = require('./auth');
const sociosRoutes = require('./socios');
const planesRoutes = require('./planes');
const pagosRoutes = require('./pagos');
const asistenciasRoutes = require('./asistencias');

// Ruta de prueba 

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
  
});

// Rutas de autenticación

router.use('/auth', authRoutes);
router.use('/socios', sociosRoutes);
router.use('/planes', planesRoutes);
router.use('/pagos', pagosRoutes);
router.use('/asistencias', asistenciasRoutes);

// Ruta de ejemplo

router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

module.exports = router;
