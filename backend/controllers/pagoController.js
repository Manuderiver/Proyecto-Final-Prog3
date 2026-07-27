const { Pago, Socio } = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const obtenerPagos = async (req, res) => {
    try {

        const pagos = await Pago.findAll({
            include: [{
                model: Socio,
                as: 'socio'
            }]
        });

        res.json(pagos);

    } catch (error) {

        if (process.env.NODE_ENV !== 'test') {
            console.error(error);
        }

        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }
};

const obtenerPagoPorId = async (req, res) => {

    try {

        const pago = await Pago.findByPk(req.params.id, {
            include: [{
                model: Socio,
                as: 'socio'
            }]
        });

        if (!pago) {
            return res.status(404).json({
                error: 'Pago no encontrado'
            });
        }

        res.json(pago);

    } catch (error) {

        if (process.env.NODE_ENV !== 'test') {
            console.error(error);
        }

        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }

};

const crearPago = async (req, res) => {

    try {

        const pago = await Pago.create(req.body);

        res.status(201).json(pago);

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
                error: 'El pago ya existe'
            });

        }

        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }

};

const actualizarPago = async (req, res) => {

    try {

        const pago = await Pago.findByPk(req.params.id);

        if (!pago) {

            return res.status(404).json({
                error: 'Pago no encontrado'
            });

        }

        await pago.update(req.body);

        res.json(pago);

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
                error: 'El pago ya existe'
            });

        }

        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }

};

const eliminarPago = async (req, res) => {

    try {

        const pago = await Pago.findByPk(req.params.id);

        if (!pago) {

            return res.status(404).json({
                error: 'Pago no encontrado'
            });

        }

        await pago.destroy();

        res.json({
            mensaje: 'Pago eliminado correctamente'
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
    obtenerPagos,
    obtenerPagoPorId,
    crearPago,
    actualizarPago,
    eliminarPago
};