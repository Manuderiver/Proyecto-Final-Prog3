// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

const UserModel = require('./User');
const SocioModel = require('./Socio');
const PlanModel = require('./Plan');
const PagoModel = require('./Pago');
const AsistenciaModel = require('./Asistencia');

const User = UserModel(sequelize);
const Socio = SocioModel(sequelize);
const Plan = PlanModel(sequelize);
const Pago = PagoModel(sequelize);
const Asistencia = AsistenciaModel(sequelize);

/*
|--------------------------------------------------------------------------
| RELACIONES
|--------------------------------------------------------------------------
*/

Plan.hasMany(Socio, {
  foreignKey: 'planId',
  as: 'socios'
});

Socio.belongsTo(Plan, {
  foreignKey: 'planId',
  as: 'plan'
});

Socio.hasMany(Pago, {
  foreignKey: 'socioId',
  as: 'pagos'
});

Pago.belongsTo(Socio, {
  foreignKey: 'socioId',
  as: 'socio'
});

Socio.hasMany(Asistencia, {
  foreignKey: 'socioId',
  as: 'asistencias'
});


Asistencia.belongsTo(Socio, {
  foreignKey: 'socioId',
  as: 'socio'
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Socio,
  Plan,
  Pago,
  Asistencia
};