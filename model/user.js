const { Sequelize } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    strategy: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    paranoid: true
}

);


module.exports = User
