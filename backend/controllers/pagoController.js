const { Pago, Socio } = require('../models');

const obtenerPagos = async (req, res) => {
try {

    const pagos = await Pago.findAll({
    include: [
        {
        model: Socio,
        as: 'socio'
        }
    ]
    });

    res.json(pagos);

} catch (error) {
    console.error(error);

    res.status(500).json({
    error: 'Error al obtener pagos'
    });
}
};

const obtenerPagoPorId = async (req, res) => {
try {

    const pago = await Pago.findByPk(
    req.params.id,
    {
        include: [
        {
            model: Socio,
            as: 'socio'
        }
        ]
    }
    );

    if (!pago) {
    return res.status(404).json({
        error: 'Pago no encontrado'
    });
    }

    res.json(pago);

} catch (error) {
    console.error(error);

    res.status(500).json({
    error: 'Error al obtener pago'
    });
}
};

const crearPago = async (req, res) => {
try {

    const pago = await Pago.create(req.body);

    res.status(201).json(pago);

} catch (error) {
    console.error(error);

    res.status(500).json({
    error: 'Error al crear pago'
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
    console.error(error);

    res.status(500).json({
    error: 'Error al actualizar pago'
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
    console.error(error);

    res.status(500).json({
    error: 'Error al eliminar pago'
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