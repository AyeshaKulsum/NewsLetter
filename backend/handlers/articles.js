const { fetchArticleseHelper } = require('../helpers/user');
const { sourcesToSubscribeHelper, fetchOneArticleHelper } = require('../helpers/usersourcemapping');

exports.fetchAllArticles = async (request, reply) => {
    try {
        let articles = await fetchArticleseHelper(request);
        reply(articles)
    }
    catch (err) {
        reply({ message: 'No Articles found', err, status: 'error' }).statusCode(500)
    }
}

exports.sourcesToSubscribe = async (request, reply) => {
    try {
        let sources = await sourcesToSubscribeHelper(request);
        reply(sources)
    }
    catch (err) {
        reply({ message: 'No Sources found', err, status: 'error' }).statusCode(500)
    }
}

exports.fetchOneArticles = async (request, reply) => {
    try {
        let articles = await fetchOneArticleHelper(request);
        reply(articles)
    }
    catch (err) {
        reply({ message: 'No Articles found', err, status: 'error' }).statusCode(500)
    }
}
