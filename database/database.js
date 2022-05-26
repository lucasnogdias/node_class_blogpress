const { Sequelize } = require("sequelize");

const connection = new Sequelize('blogpress', 'root', '[DB_PASSWORD_HERE]', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: "+00:00"
});

module.exports = connection;