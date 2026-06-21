const express = require('express');
const router = express.Router();

const {
obtenerPlanes,
obtenerPlanPorId,
crearPlan,
actualizarPlan,
eliminarPlan
} = require('../controllers/planController');

router.get('/', obtenerPlanes);
router.get('/:id', obtenerPlanPorId);
router.post('/', crearPlan);
router.put('/:id', actualizarPlan);
router.delete('/:id', eliminarPlan);

module.exports = router;