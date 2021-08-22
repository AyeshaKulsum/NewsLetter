const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Session = db.define('Session', {

    access_token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    paranoid: true
}

);

module.exports = Session
