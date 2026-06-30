const express = require('express');

const router = express.Router();

const {
obtenerAsistencias,
obtenerAsistenciaPorId,
crearAsistencia,
actualizarAsistencia,
eliminarAsistencia

} = require('../controllers/asistenciaController');

const { verificarToken } = require('../middleware/auth');

router.get('/', verificarToken, obtenerAsistencias);

router.get('/:id', verificarToken, obtenerAsistenciaPorId);

router.post('/', verificarToken, crearAsistencia);

router.put('/:id', verificarToken, actualizarAsistencia);

router.delete('/:id', verificarToken, eliminarAsistencia);

module.exports = router;