const { addToES, searchES } = require('../config/elasticsearch');
const { ERROR } = require('../constants');
const UserSourceMapping = require('../model/usersourcemapping');

const queryToAddToES = async (indexName, type, articles) => {
    try {
        if (articles.length > 0) {
            let bulkData = [];
            articles.forEach((article) => {
                if (article.id) {
                    bulkData.push({ "index": { _index: indexName, _type: type, _id: article.id } });
                    bulkData.push(article);
                }
            });
            if (bulkData.length > 0) {
                await addToES(indexName, type, bulkData);
            }
        }
    }
    catch (err) {
        return { message: 'Unable to add to elasticsearch', err, status: ERROR }
    }
}

const searchArticleseHelper = async (request) => {
    try {
        const { user_id } = request.auth.credentials
        const { query } = JSON.parse(request.payload);
        let sourceids = [... (await UserSourceMapping.findAll({
            where: {
                user_id
            },
            raw: true,
            attributes: ['source_id']
        }))].map(sources => sources.source_id);
        let result = await searchES('rss', 'articles', query, sourceids);
        return result;
    }
    catch (err) {
        return { message: 'No articles found', err, status: ERROR }
    }
}

module.exports = { queryToAddToES, searchArticleseHelper }