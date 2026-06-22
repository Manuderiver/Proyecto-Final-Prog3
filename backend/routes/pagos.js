const express = require('express');

const router = express.Router();

const {
obtenerPagos,
obtenerPagoPorId,
crearPago,
actualizarPago,
eliminarPago
} = require('../controllers/pagoController');

const { verificarToken } = require('../middleware/auth');

router.get('/', verificarToken, obtenerPagos);

router.get('/:id', verificarToken, obtenerPagoPorId);

router.post('/', verificarToken, crearPago);

router.put('/:id', verificarToken, actualizarPago);

router.delete('/:id', verificarToken, eliminarPago);

module.exports = router;