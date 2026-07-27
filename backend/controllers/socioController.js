const { Socio, Plan } = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const obtenerSocios = async (req, res) => {
    try {

        const socios = await Socio.findAll({
            include: [{
                model: Plan,
                as: 'plan'
            }]
        });

        res.json(socios);

    } catch (error) {

        if (process.env.NODE_ENV !== 'test') {
            console.error(error);
        }

        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }
};

const obtenerSocioPorId = async (req, res) => {

    try {

        const socio = await Socio.findByPk(req.params.id, {
            include: [{
                model: Plan,
                as: 'plan'
            }]
        });

        if (!socio) {
            return res.status(404).json({
                error: 'Socio no encontrado'
            });
        }

        res.json(socio);

    } catch (error) {

        if (process.env.NODE_ENV !== 'test') {
            console.error(error);
        }

        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }

};

const crearSocio = async (req, res) => {

    try {

        const socio = await Socio.create(req.body);

        res.status(201).json(socio);

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
                error: 'El DNI o el email ya existen'
            });

        }

        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }

};

const actualizarSocio = async (req, res) => {

    try {

        const socio = await Socio.findByPk(req.params.id);

        if (!socio) {

            return res.status(404).json({
                error: 'Socio no encontrado'
            });

        }

        await socio.update(req.body);

        res.json(socio);

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
                error: 'El DNI o el email ya existen'
            });

        }

        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }

};

const eliminarSocio = async (req, res) => {

    try {

        const socio = await Socio.findByPk(req.params.id);

        if (!socio) {

            return res.status(404).json({
                error: 'Socio no encontrado'
            });

        }

        await socio.destroy();

        res.json({
            mensaje: 'Socio eliminado correctamente'
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
    obtenerSocios,
    obtenerSocioPorId,
    crearSocio,
    actualizarSocio,
    eliminarSocio
};