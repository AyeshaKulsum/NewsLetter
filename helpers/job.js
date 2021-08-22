

let Parser = require('rss-parser');

let parser = new Parser();

var crypto = require('crypto');
const Source = require('../model/source');
const Article = require('../model/article');
const { queryToAddToES } = require('./articles');




const createHash = string => {
    var md5sum = crypto.createHash('md5');
    md5sum.update(JSON.stringify(string));
    return md5sum.digest('hex');
}

exports.updateArticlesJob = async (request) => {
    try {
        let articlesToES = []
        let sources = await Source.findAll();
        sources.forEach(async source => {
            let prevHash = source.Hash;
            let result = await parseRssUrl(source.FeedUrl);
            if (result.status !== 'error') {
                let resultString = JSON.stringify(result);
                let hashedResult = createHash(resultString);
                if (hashedResult !== prevHash) {
                    Source.update({
                        Hash: hashedResult
                    },
                        {
                            where: {
                                id: source.id
                            }
                        }).then(s => {
                            result.items.forEach((element, index) => {
                                Article.findOne({ where: { Link: element.link } }).then(
                                    article => {
                                        if (!article) {
                                            Article.create({
                                                Title: element.title, Link: element.link, PubDate: element.pubDate, Author: element.author, Content: element.content,
                                                ContentSnippet: element.contentSnippet, source_id: source.id
                                            }
                                            ).then(data => {
                                                let article = {
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
                                                articlesToES.push(article);
                                            })
                                        }

                                    }
                                )

                            });
                        })
                }

            }
        });
        queryToAddToES('rss', 'articles', articlesToES);
    }
    catch (err) {
        return { message: 'Cron Job failed', err, status: 'error' }

    }
}


const parseRssUrl = async (url, lastBuildDate) => {
    try {
        return parser.parseURL(url);
    }
    catch (err) {
        return { message: 'Unable to parse', err, status: 'error' }
    }
}