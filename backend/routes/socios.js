const express = require('express');

const router = express.Router();

const {
obtenerSocios,
obtenerSocioPorId,
crearSocio,
actualizarSocio,
eliminarSocio
} = require('../controllers/socioController');

router.get('/', obtenerSocios);

router.get('/:id', obtenerSocioPorId);

router.post('/', crearSocio);

router.put('/:id', actualizarSocio);

router.delete('/:id', eliminarSocio);

module.exports = router;