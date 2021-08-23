const { ERROR, INTERNAL_SERVER_ERROR_CODE } = require('../constants');
const { fetchArticleseHelper } = require('../helpers/articles');
const { sourcesToSubscribeHelper, fetchOneArticleHelper, allSourcesHelper, searchArticleseHelper } = require('../helpers/sources');

exports.fetchAllArticles = async (request, reply) => {
    try {
        let articles = await fetchArticleseHelper(request);
        reply(articles)
    }
    catch (err) {
        reply({ message: 'No Articles found', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}
exports.searchArticles = async (request, reply) => {
    try {
        let articles = await searchArticleseHelper(request);
        reply(articles)
    }
    catch (err) {
        reply({ message: 'No Articles found', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}
exports.sourcesToSubscribe = async (request, reply) => {
    try {
        let sources = await sourcesToSubscribeHelper(request);
        reply(sources)
    }
    catch (err) {
        reply({ message: 'No Sources found', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}

exports.allSources = async (request, reply) => {
    try {
        let sources = await allSourcesHelper(request);
        reply(sources)
    }
    catch (err) {
        reply({ message: 'No Sources found', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}

exports.fetchOneArticles = async (request, reply) => {
    try {
        let articles = await fetchOneArticleHelper(request.params.source_id);
        reply(articles)
    }
    catch (err) {
        reply({ message: 'No Articles found', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}
