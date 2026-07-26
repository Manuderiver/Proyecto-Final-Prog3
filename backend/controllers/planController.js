const { Plan } = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const obtenerPlanes = async (req, res) => {

    try {

        const planes = await Plan.findAll();

        res.json(planes);

    } catch (error) {

        if (process.env.NODE_ENV !== 'test') {
            console.error(error);
        }

        res.status(500).json({
            error: 'Error interno del servidor'
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

        if (process.env.NODE_ENV !== 'test') {
            console.error(error);
        }

        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }

};

const crearPlan = async (req, res) => {

    try {

        const plan = await Plan.create(req.body);

        res.status(201).json(plan);

    } catch (error) {

        if (process.env.NODE_ENV !== 'test') {
            console.error(error);
        }

        if (error instanceof ValidationError) {

            return res.status(400).json({
                error: error.errors[0].message
            });

        }

        if (error instanceof UniqueConstraintError) {

            return res.status(409).json({
                error: 'Ya existe un plan con esos datos'
            });

        }

        res.status(500).json({
            error: 'Error interno del servidor'
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

        if (process.env.NODE_ENV !== 'test') {
            console.error(error);
        }

        if (error instanceof ValidationError) {

            return res.status(400).json({
                error: error.errors[0].message
            });

        }

        if (error instanceof UniqueConstraintError) {

            return res.status(409).json({
                error: 'Ya existe un plan con esos datos'
            });

        }

        res.status(500).json({
            error: 'Error interno del servidor'
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

        if (process.env.NODE_ENV !== 'test') {
            console.error(error);
        }

        res.status(500).json({
            error: 'Error interno del servidor'
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