const express = require('express');

const router = express.Router();

const {
obtenerPlanes,
obtenerPlanPorId,
crearPlan,
actualizarPlan,
eliminarPlan
} = require('../controllers/planController');

const { verificarToken } = require('../middleware/auth');

router.get('/', verificarToken, obtenerPlanes);

router.get('/:id', verificarToken, obtenerPlanPorId);

router.post('/', verificarToken, crearPlan);

router.put('/:id', verificarToken, actualizarPlan);

router.delete('/:id', verificarToken, eliminarPlan);

module.exports = router;