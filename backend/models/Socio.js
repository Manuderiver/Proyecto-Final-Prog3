const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const Socio = sequelize.define('Socio', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },

    nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    }
    },

    apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    }
    },

    dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },

    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
    },

    telefono: {
    type: DataTypes.STRING,
    allowNull: false
    },

    fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
    },

    activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
    }

}, {
    tableName: 'socios',
    timestamps: true
});

return Socio;
};