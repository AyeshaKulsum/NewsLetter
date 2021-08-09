const { Sequelize } = require('sequelize');
const db = require('../config/database');

const UserSourceMapping = db.define('UserSourceMapping', {

}, {
    paranoid: true
}

);


UserSourceMapping.associate = (models) => {
    UserSourceMapping.belongsTo(models.Source, {
        foreignKey: 'source_id'
    })

    UserSourceMapping.belongsTo(models.User, {
        foreignKey: 'user_id'
    })
};


module.exports = UserSourceMapping
