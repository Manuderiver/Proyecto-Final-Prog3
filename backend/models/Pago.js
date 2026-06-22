const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const Pago = sequelize.define('Pago', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },

    monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
    },

    fechaPago: {
    type: DataTypes.DATEONLY,
    allowNull: false
    },

    metodoPago: {
    type: DataTypes.STRING,
    allowNull: false
    }

}, {
    tableName: 'pagos',
    timestamps: true
});

return Pago;
};