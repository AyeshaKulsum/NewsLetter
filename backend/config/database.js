const { Sequelize } = require('sequelize');

//DB Connection
module.exports = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  logging: false
});
