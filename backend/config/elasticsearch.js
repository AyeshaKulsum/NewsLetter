var elasticsearch = require('elasticsearch');

const elasticSearchClient = new elasticsearch.Client({
    host: 'localhost:9200',
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
                            match_phrase: {
                                "Content": searchQuery
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
            status: 'success',
            result: results
        }
        return res;
    } catch (error) {
        return { message: 'No Articles found', error, status: 'error' };
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
                // console.log( resp);
            }
            // if (resp.errors) {
            //     console.log(JSON.stringify(resp, null, '\t'));
            // }
            if (err) {
                // console.log(err);
            }
        });
    } catch (error) {
        return { message: 'Unable to add to Elastic search', error, status: 'error' };
    }
}

// const initializeIndex = async (indexName, properties) => {
//     try {
//         await elasticsearchClient.indices.get({
//             index: indexName
//         });
//         logger.info(`index "${indexName}" already created`);
//     } catch (e) {
//         logger.warn(`index "${indexName}" is missing. creating...`);
//         await elasticsearchClient.indices.create({
//             index: indexName,
//             body: {
//                 "mappings": {
//                     "properties": properties
//                 }
//             }
//         });
//         logger.info(`index "${indexName}" created`);
//     }
// }

module.exports = { elasticSearchClient, addToES, searchES }