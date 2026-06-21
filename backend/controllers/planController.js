const { Plan } = require('../models');

const obtenerPlanes = async (req, res) => {
try {
    const planes = await Plan.findAll();
    res.json(planes);
} catch (error) {
    res.status(500).json({
    error: 'Error al obtener planes'
    });
}
};

const obtenerPlanPorId = async (req, res) => {
try {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
    return res.status(404).json({
        error: 'Plan no encontrado'
    });
    }

    res.json(plan);
} catch (error) {
    res.status(500).json({
    error: 'Error al obtener plan'
    });
}
};

const crearPlan = async (req, res) => {
try {
    const plan = await Plan.create(req.body);

    res.status(201).json(plan);
} catch (error) {
    res.status(500).json({
    error: 'Error al crear plan'
    });
}
};

const actualizarPlan = async (req, res) => {
try {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
    return res.status(404).json({
        error: 'Plan no encontrado'
    });
    }

    await plan.update(req.body);

    res.json(plan);
} catch (error) {
    res.status(500).json({
    error: 'Error al actualizar plan'
    });
}
};

const eliminarPlan = async (req, res) => {
try {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
    return res.status(404).json({
        error: 'Plan no encontrado'
    });
    }

    await plan.destroy();

    res.json({
    mensaje: 'Plan eliminado correctamente'
    });
} catch (error) {
    res.status(500).json({
    error: 'Error al eliminar plan'
    });
}
};

module.exports = {
obtenerPlanes,
obtenerPlanPorId,
crearPlan,
actualizarPlan,
eliminarPlan
};