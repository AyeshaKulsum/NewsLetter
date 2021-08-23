const { Sequelize } = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');

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
    paranoid: true,
    hooks: {
        beforeCreate: async function (user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
}

);

User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = User
