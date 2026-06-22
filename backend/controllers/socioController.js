const { Socio, Plan } = require('../models');

const obtenerSocios = async (req, res) => {
try {

    const socios = await Socio.findAll({
    include: [
        {
        model: Plan,
        as: 'plan'
        }
    ]
    });

    res.json(socios);

} catch (error) {
    console.error(error);

    res.status(500).json({
    error: 'Error al obtener socios'
    });
}
};

const obtenerSocioPorId = async (req, res) => {
try {

    const socio = await Socio.findByPk(
    req.params.id,
    {
        include: [
        {
            model: Plan,
            as: 'plan'
        }
        ]
    }
    );

    if (!socio) {
    return res.status(404).json({
        error: 'Socio no encontrado'
    });
    }

    res.json(socio);

} catch (error) {
    console.error(error);

    res.status(500).json({
    error: 'Error al obtener socio'
    });
}
};

const crearSocio = async (req, res) => {
try {

    const socio = await Socio.create(req.body);

    res.status(201).json(socio);

} catch (error) {
    console.error(error);

    res.status(500).json({
    error: 'Error al crear socio'
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
    console.error(error);

    res.status(500).json({
    error: 'Error al actualizar socio'
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
    console.error(error);

    res.status(500).json({
    error: 'Error al eliminar socio'
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