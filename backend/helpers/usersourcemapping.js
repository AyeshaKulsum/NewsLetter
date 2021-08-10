
const Article = require("../model/article");
const Source = require("../model/source");
const UserSourceMapping = require("../model/usersourcemapping");
let Parser = require('rss-parser');
const { QueryTypes } = require("sequelize");
const User = require("../model/user");

let parser = new Parser();

const subscribeHelper = async (request) => {
    try {
        const { source_id, feedUrl } = request.payload
        const { user_id } = request.auth.credentials
        if (feedUrl) {
            let source = await Source.findOne({
                where: {
                    FeedUrl: feedUrl
                }
            });
            console.log("source")
            if (!source) {
                let mapSourcePromise = new Promise(async (resolve, reject) => {
                    let articles = await parser.parseURL(feedUrl);
                    console.log(articles.items.length)
                    source = await Source.create({ FeedUrl: feedUrl, Title: articles.title, LastBuildDate: articles.lastBuildDate, Link: articles.link })
                    articles.items.forEach((element, index) => {
                        Article.create({
                            Title: element.title, Link: element.link, PubDate: element.pubDate, Author: element.author, Content: element.content,
                            ContentSnippet: element.contentSnippet, source_id: source.id
                        }).then(async data => {
                            if (index === articles.items.length - 1) {
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
                    return { message: 'Subscribe already exists', status: 'success' }
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
        console.log(subscribeExists);
        if (subscribeExists) {
            let unsubscribe = await UserSourceMapping.destroy({ where: { id: subscribeExists.id } })
            return { status: 'success', unsubscribe };
        }
        else {
            console.log('err1');
            return { message: 'Unable to unsubscribe', status: 'error' }
        }
    }
    catch (err) {
        console.log('err12', err);
        return { message: 'Unable to unsubscribe', err, status: 'error' }
    }

}

const sourcesToSubscribeHelper = async (request) => {
    try {
        const { user_id } = request.auth.credentials
        const result = await Source.sequelize.query(
            "select distinct(s.id) as source_id,s.\"FeedUrl\",s.\"Title\",s.\"Link\" from \"Sources\" s left join \"UserSourceMappings\" usm on usm.source_id=s.id where (usm.user_id is null or usm.user_id!=1) and s.\"deletedAt\" is null",
            {
                type: QueryTypes.SELECT,
                replacements: { user_id }

            },
            {
                paranoid: true
            }
        );
        return result;
    }
    catch (err) {
        console.log(err);
        return { message: 'No sources found', err, status: 'error' }
    }
}


const profileHelper = async (request) => {
    try {
        console.log('here');
        const { user_id } = request.auth.credentials
        let result = await User.sequelize.query("select u.\"userName\",s.id as source_id,u.email,s.\"FeedUrl\",s.\"Link\",s.\"Title\" from \"Users\" u inner join \"UserSourceMappings\" usm on usm.user_id=u.id inner join \"Sources\" s on s.id=usm.source_id where u.id=1 and s.\"deletedAt\" is null", {
            type: QueryTypes.SELECT,
            replacements: { user_id }
        })
        console.log(result);
        return result;
    }
    catch (err) {
        console.log(err);
        return { message: '', err, status: 'error' }
    }
}


const fetchOneArticleHelper = async (request) => {
    try {
        const { user_id } = request.auth.credentials
        const { source_id } = request.params
        const result = await Article.sequelize.query(
            "select usm.source_id,s.\"FeedUrl\",s.\"Link\",s.\"Title\",a.\"Title\" as article_title,a.\"Link\" as article_link,a.\"Author\",a.\"Content\",a.\"ContentSnippet\",a.\"PubDate\",s.\"LastBuildDate\" from \"Users\" u inner join \"UserSourceMappings\" usm on usm.user_id=u.id inner join \"Sources\" s on s.id=usm.source_id inner join \"Articles\" a on a.source_id=s.id where u.id=:user_id and s.\"deletedAt\" is null and a.\"deletedAt\" is null and a.source_id=:source_id",
            {
                type: QueryTypes.SELECT,
                replacements: { user_id, source_id }

            }
        );
        console.log(result);
        return result;
    }
    catch (err) {
        console.log(err);
        return { message: 'Source not found', err, status: 'error' }
    }
}

module.exports = { unsubscribeHelper, subscribeHelper, sourcesToSubscribeHelper, profileHelper, fetchOneArticleHelper }