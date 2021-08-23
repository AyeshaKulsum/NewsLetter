
const Article = require("../model/article");
const Source = require("../model/source");
const UserSourceMapping = require("../model/usersourcemapping");
let Parser = require('rss-parser');
const { Op, Sequelize } = require("sequelize");
const User = require("../model/user");
const client = require('../config/redis');
var crypto = require('crypto');
const { queryToAddToES } = require("./articles");
let parser = new Parser();
const createHash = string => {
    var md5sum = crypto.createHash('md5');
    md5sum.update(JSON.stringify(string));
    return md5sum.digest('hex');
}
const subscribeHelper = async (request) => {
    try {
        let { source_id, feedUrl } = request.payload
        const { user_id } = request.auth.credentials
        let articlesToES = []
        if (feedUrl) {
            let source = await Source.findOne({
                where: {
                    FeedUrl: feedUrl
                }
            });
            if (!source) {
                let mapSourcePromise = new Promise(async (resolve, reject) => {
                    let articles = await parser.parseURL(feedUrl);
                    source = await Source.create({ FeedUrl: feedUrl, Title: articles.title, LastBuildDate: articles.lastBuildDate, Link: articles.link, Hash: createHash(JSON.stringify(articles)) })
                    articles.items.forEach((element, index) => {
                        Article.create({
                            Title: element.title, Link: element.link, PubDate: element.pubDate, Author: element.author, Content: element.content,
                            ContentSnippet: element.contentSnippet, source_id: source.id
                        }).then(async data => {
                            let a = {
                                "id": data.id,
                                "Title": source.Title,
                                "Link": data.Link,
                                "Author": data.Author,
                                "Content": data.Content,
                                "ContentSnippet": data.ContentSnippet,
                                "Categories": data.Categories,
                                "PubDate": data.PubDate,
                                "source_id": source.id,
                                "article_title": data.Title,
                                "FeedUrl": source.FeedUrl
                            };
                            articlesToES.push(a);
                            if (index === articles.items.length - 1) {
                                sources = fetchAllSourcesPostgres();
                                queryToAddToES('rss', 'articles', articlesToES);
                                resolve();
                            }
                        })
                    });


                });

                let suc = await mapSourcePromise;

                let subscribe = await UserSourceMapping.create({ user_id, source_id: source.id });
                return { status: 'success', subscribe };

            }
            else {
                source_id = source.id
                let subscribeExists = await UserSourceMapping.findOne({
                    where: {
                        user_id, source_id
                    }
                })
                if (!subscribeExists) {
                    let subscribe = await UserSourceMapping.create({ user_id, source_id });
                    return { status: 'success', subscribe };
                }
                else {
                    return { message: 'Subscribe already exists', status: 'error' }
                }
            }

        }


    }
    catch (err) {

        return { message: 'Unable to Subscribe', err, status: 'error' }
    }

}


const unsubscribeHelper = async (request) => {
    try {
        const { source_id } = request.payload
        const { user_id } = request.auth.credentials
        let subscribeExists = await UserSourceMapping.findOne({
            where: {
                user_id, source_id
            }
        })
        if (subscribeExists) {
            let unsubscribe = await UserSourceMapping.destroy({ where: { id: subscribeExists.id } })
            return { status: 'success', unsubscribe };
        }
        else {
            return { message: 'Unable to unsubscribe', status: 'error' }
        }
    }
    catch (err) {
        return { message: 'Unable to unsubscribe', err, status: 'error' }
    }

}

const allSourcesHelper = (request) => {
    let sources = null;
    try {
        let redisPromise = new Promise((resolve, reject) => {
            client.get(`FETCH_ALL_SOURCES`, (err, value) => {
                if (err) throw err;
                if (value) {
                    console.log('Data from Redis', JSON.parse(value));
                    sources = JSON.parse(value);
                }
                else {
                    console.log('Data from postgres');
                    sources = fetchAllSourcesPostgres();
                }
                if (sources !== null) {
                    resolve(sources)
                }
            });

        })
        return redisPromise;
    }
    catch (err) {
        return { message: 'No sources found', err, status: 'error' }
    }

}

const fetchAllSourcesPostgres = async (request) => {
    try {

        const result = await Source.findAll({ attributes: [['id', 'source_id'], 'FeedUrl', 'Title', 'Link'] });
        let response = {
            status: 'success',
            result
        }
        client.setex("FETCH_ALL_SOURCES", 3800, JSON.stringify(response));
        return response;
    }
    catch (err) {
        return { message: 'No sources found', err, status: 'error' }
    }
}

const sourcesToSubscribeHelper = async (request) => {
    try {
        const { user_id } = request.auth.credentials
        let sourceids = [... (await UserSourceMapping.findAll({
            where: {
                user_id
            },
            raw: true,
            attributes: ['source_id']
        }))].map(sources => sources.source_id);
        sourceids.push(-1)
        const result = await Source.findAll({ where: { [Op.not]: { id: sourceids } }, attributes: [['id', 'source_id'], 'FeedUrl', 'Title', 'Link'] })
        let response = {
            status: 'success',
            result
        }
        return response;
    }
    catch (err) {
        return { message: 'No sources found', err, status: 'error' }
    }
}


const profileHelper = async (request) => {
    try {
        const { user_id } = request.auth.credentials
        let userDetails = await User.findOne({
            where: {
                id: user_id,

            },
            attributes: ['userName', 'email']
        })
        let subscribedSources = await UserSourceMapping.findAll({
            where: { user_id },
            raw: true,
            include: [
                {
                    model: Source,
                    raw: true,
                    attributes: []
                }
            ],
            attributes: ['source_id', [Sequelize.col('Source.FeedUrl'), 'FeedUrl'], [Sequelize.col('Source.Link'), 'Link'], [Sequelize.col('Source.Title'), 'Title']]
        })
        let result = {
            userName: userDetails.userName,
            email: userDetails.email,
            subscribedSources
        }
        let response = {
            status: 'success',
            result
        }
        return response;
    }
    catch (err) {
        return { message: '', err, status: 'error' }
    }
}


const fetchOneArticleHelper = async (source_id) => {
    try {
        let result = await Article.findAll({
            where: { source_id },
            raw: true,
            include: [{
                model: Source,

            }]
        })
        let response = {
            status: 'success',
            result
        }
        return response;
    }
    catch (err) {
        return { message: 'Source not found', err, status: 'error' }
    }
}

module.exports = { unsubscribeHelper, subscribeHelper, sourcesToSubscribeHelper, profileHelper, fetchOneArticleHelper, allSourcesHelper }