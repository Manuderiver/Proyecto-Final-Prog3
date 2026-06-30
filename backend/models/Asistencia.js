const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

const Asistencia = sequelize.define('Asistencia', {

    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },

    fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
    },

    horaIngreso: {
    type: DataTypes.TIME,
    allowNull: false
    },

    observaciones: {
    type: DataTypes.STRING,
    allowNull: true
    },

    presente: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
    },

    socioId: {
    type: DataTypes.INTEGER,
    allowNull: false
    }

}, {

    tableName: 'asistencias',
    timestamps: true

});

return Asistencia;

};