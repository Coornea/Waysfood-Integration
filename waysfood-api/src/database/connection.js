const Sequelize = require("sequelize");

const db = {};

// Customize database config
const sequelize = new Sequelize('waysfood','root',null, {
    host = 'localhost',
    dialect = 'mysql',
    logging = console.log,
    freezeTableName : true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// Enter database config to Sequelize
db.sequelize = sequelize;

// Export module
module.exports = db;
