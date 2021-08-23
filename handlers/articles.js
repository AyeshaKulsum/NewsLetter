const { ERROR } = require('../constants');
const { searchArticleseHelper } = require('../helpers/articles');
const { fetchArticleseHelper } = require('../helpers/user');
const { sourcesToSubscribeHelper, fetchOneArticleHelper, allSourcesHelper } = require('../helpers/usersourcemapping');

exports.fetchAllArticles = async (request, reply) => {
    try {
        let articles = await fetchArticleseHelper(request);
        reply(articles)
    }
    catch (err) {
        reply({ message: 'No Articles found', err, status: ERROR }).code(500)
    }
}
exports.searchArticles = async (request, reply) => {
    try {
        let articles = await searchArticleseHelper(request);
        reply(articles)
    }
    catch (err) {
        reply({ message: 'No Articles found', err, status: ERROR }).code(500)
    }
}
exports.sourcesToSubscribe = async (request, reply) => {
    try {
        let sources = await sourcesToSubscribeHelper(request);
        reply(sources)
    }
    catch (err) {
        reply({ message: 'No Sources found', err, status: ERROR }).code(500)
    }
}

exports.allSources = async (request, reply) => {
    try {
        let sources = await allSourcesHelper(request);
        reply(sources)
    }
    catch (err) {
        reply({ message: 'No Sources found', err, status: ERROR }).code(500)
    }
}

exports.fetchOneArticles = async (request, reply) => {
    try {
        let articles = await fetchOneArticleHelper(request.params.source_id);
        reply(articles)
    }
    catch (err) {
        reply({ message: 'No Articles found', err, status: ERROR }).code(500)
    }
}
