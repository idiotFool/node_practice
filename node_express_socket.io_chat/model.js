const {DataTypes, Sequelize} = require('sequelize');
const seq = require('./sequelize.js')

const User = seq.define('users', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {
    User
}
