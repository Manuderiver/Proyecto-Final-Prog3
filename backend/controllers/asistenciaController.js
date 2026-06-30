const { Asistencia, Socio } = require('../models');

const obtenerAsistencias = async (req, res) => {
  try {

    const asistencias = await Asistencia.findAll({
      include: {
        model: Socio,
        as: 'socio'
      }
    });

    res.json(asistencias);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error al obtener asistencias'
    });

  }
};

const obtenerAsistenciaPorId = async (req, res) => {
  try {

    const asistencia = await Asistencia.findByPk(
      req.params.id,
      {
        include: {
          model: Socio,
          as: 'socio'
        }
      }
    );

    if (!asistencia) {
      return res.status(404).json({
        error: 'Asistencia no encontrada'
      });
    }

    res.json(asistencia);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error al obtener asistencia'
    });

  }
};

const crearAsistencia = async (req, res) => {

  try {

    const { socioId } = req.body;

    const socio = await Socio.findByPk(socioId);

    if (!socio) {
      return res.status(404).json({
        error: 'El socio no existe'
      });
    }

    const asistencia = await Asistencia.create(req.body);

    res.status(201).json(asistencia);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error al crear asistencia'
    });

  }

};

const actualizarAsistencia = async (req, res) => {

try {

    const asistencia = await Asistencia.findByPk(req.params.id);

    if (!asistencia) {
    return res.status(404).json({
        error: 'Asistencia no encontrada'
    });
    }

    await asistencia.update(req.body);

    res.json(asistencia);

} catch (error) {

    console.error(error);

    res.status(500).json({
    error: 'Error al actualizar asistencia'
    });

}

};

const eliminarAsistencia = async (req, res) => {

try {

    const asistencia = await Asistencia.findByPk(req.params.id);

    if (!asistencia) {
    return res.status(404).json({
        error: 'Asistencia no encontrada'
    });
    }

    await asistencia.destroy();

    res.json({
    mensaje: 'Asistencia eliminada correctamente'
    });

} catch (error) {

    console.error(error);

    res.status(500).json({
    error: 'Error al eliminar asistencia'
    });

}

};

module.exports = {
obtenerAsistencias,
obtenerAsistenciaPorId,
crearAsistencia,
actualizarAsistencia,
eliminarAsistencia
};