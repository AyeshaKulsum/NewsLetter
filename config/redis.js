const redis = require("redis");
const { ERROR } = require("../constants");

const client = redis.createClient(console.log('Redis is connected'));

client.on(ERROR, function (error) {
    console.error(error);
});

module.exports = client