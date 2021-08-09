const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Article = db.define('Article', {

    Title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Author: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    Content: {
        type: Sequelize.STRING,
        allowNull: true
    }
    ,
    ContentSnippet: {
        type: Sequelize.TEXT,
        allowNull: false
    }
    // ,
    // Categories: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
    // ,
    // Guid: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
    ,
    PubDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
    // ,
    // IsoDate: {
    //     type: Sequelize.DATE,
    //     allowNull: false
    // }
}, {
    paranoid: true
}

);

Article.associate = (models) => {
    Article.belongsTo(models.Source, {
        foreignKey: 'source_id'
    })
};


module.exports = Article









