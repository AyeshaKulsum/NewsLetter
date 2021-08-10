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
        allowNull: true
    }
    ,
    Content: {
        type: Sequelize.TEXT,
        allowNull: true
    }
    ,
    ContentSnippet: {
        type: Sequelize.TEXT,
        allowNull: true
    }
    ,
    Categories: {
        type: Sequelize.TEXT,
        allowNull: true
    }
    // ,
    // Guid: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
    ,
    PubDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
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









