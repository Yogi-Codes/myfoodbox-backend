const db_config = require('../config/db.config');
const Sequelize = require('sequelize');

// configure sequalize
const sequelize = new Sequelize(
    db_config.DB,
    db_config.USER,
    db_config.PASSWORD, {
        host: db_config.HOST,
        dialect: db_config.dialect,
        operationAliases: false,
        pool: {
            max: db_config.pool.max,
            min: db_config.pool.min,
            acquire: db_config.pool.acquire,
            idle: db_config.pool.idle
        }
    }
)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.restaurant = require('./restaurant.model')(sequelize, Sequelize);
db.appearence = require('./appearence.model')(sequelize, Sequelize);
db.otp = require('./otp.model')(sequelize, Sequelize);

// add models


module.exports = db;