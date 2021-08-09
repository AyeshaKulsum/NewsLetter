const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Source = db.define('Source', {

    FeedUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    LastBuildDate: {
        type: Sequelize.DATE,
        allowNull: false
    }
    ,
    Link: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    paranoid: true
}

);


module.exports = Source
