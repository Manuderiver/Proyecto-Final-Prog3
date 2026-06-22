const express = require('express');

const router = express.Router();

const {
obtenerSocios,
obtenerSocioPorId,
crearSocio,
actualizarSocio,
eliminarSocio
} = require('../controllers/socioController');

const { verificarToken } = require('../middleware/auth');

router.get('/', verificarToken, obtenerSocios);

router.get('/:id', verificarToken, obtenerSocioPorId);

router.post('/', verificarToken, crearSocio);

router.put('/:id', verificarToken, actualizarSocio);

router.delete('/:id', verificarToken, eliminarSocio);

module.exports = router;