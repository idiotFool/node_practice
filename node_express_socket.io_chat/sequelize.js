const Sequelize = require('sequelize');
const conf = {
  host: 'localhost',
  dialect: 'mysql'
};

const seq = new Sequelize('db_chat_users', 'root', 'root', conf);

module.exports = seq;