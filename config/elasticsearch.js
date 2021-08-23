var elasticsearch = require('elasticsearch');
const { ERROR, SUCCESS } = require('../constants');

const elasticSearchClient = new elasticsearch.Client({
    host: process.env.ELASTICHOST,
    // log: 'trace',
    apiVersion: '7.2',
});

elasticSearchClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 5000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('ElasticSearch is connected');
    }
});

const searchES = async (indexName, type, searchQuery, sourceIds) => {
    try {
        let results = []
        let response = await elasticSearchClient.search({
            index: indexName,
            type: type,
            body: {
                query: {
                    bool: {
                        must: {
                            multi_match: {
                                query: searchQuery,
                                fields: ["Content", "article_title", "Title"]
                            }
                        },
                        filter: {
                            terms: {
                                "source_id": sourceIds
                            }
                        }
                    }

                }
            }
        })
        console.log('total', response.hits.total)
        response.hits.hits.forEach(function (article) {
            results.push(article._source);
        });
        let res = {
            status: SUCCESS,
            result: results
        }
        return res;
    } catch (error) {
        return { message: 'No Articles found', error, status: ERROR };
    }
}


const addToES = (indexName, type, data) => {
    try {
        elasticSearchClient.bulk({
            index: indexName,
            type: type,
            body: data
        }, function (err, resp) {
            if (resp) {
            }
            if (err) {
            }
        });
    } catch (error) {
        return { message: 'Unable to add to Elastic search', error, status: ERROR };
    }
}

module.exports = { elasticSearchClient, addToES, searchES }