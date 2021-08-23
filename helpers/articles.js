const { Sequelize } = require('sequelize');
const { addToES } = require('../config/elasticsearch');
const { ERROR, SUCCESS } = require('../constants');
const Article = require('../model/article');
const Source = require('../model/source');
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

const fetchArticleseHelper = async (request) => {
    try {
        const { user_id } = request.auth.credentials
        let sourceids = [... (await UserSourceMapping.findAll({
            where: {
                user_id
            },
            raw: true,
            attributes: ['source_id']
        }))].map(sources => sources.source_id);
        let result = await Article.findAll({
            where: { source_id: sourceids },
            raw: true,
            include: [{
                model: Source,
                attributes: [],
                required: true
            }],
            order: [['PubDate', 'DESC']],
            attributes: ['source_id', ['Title', 'article_title'], ['Link', 'article_link'], ['Author', 'Author'], ['Content', 'Content'], ['ContentSnippet', 'ContentSnippet'], ['PubDate', 'PubDate'],
                [Sequelize.col('Source.FeedUrl'), 'FeedUrl'], [Sequelize.col('Source.Link'), 'Link']
                , [Sequelize.col('Source.Title'), 'Title'], [Sequelize.col('Source.LastBuildDate'), 'LastBuildDate']]
        })

        let response = {
            status: SUCCESS,
            result
        }
        return response;
    }
    catch (err) {
        console.log(err);
        return { message: 'No articles found', err, status: ERROR }
    }
}

module.exports = { queryToAddToES, fetchArticleseHelper }