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
        allowNull: true
    }
    ,
    Link: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    Hash: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    paranoid: true
}

);


module.exports = Source
