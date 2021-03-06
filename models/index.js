const Sequelize = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,

  pool: {
    max: config.pool?.max,
    min: config.pool?.min,
    acquire: config.pool?.acquire,
    idle: config.pool?.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.contact = require('./contact.model')(sequelize, Sequelize);
db.company = require('./company.model')(sequelize, Sequelize);

db.contact.hasOne(db.company);
db.company.belongsTo(db.contact);

module.exports = db;
