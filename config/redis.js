const redis = require("redis");
const client = redis.createClient(console.log('Redis is connected'));

client.on("error", function (error) {
    console.error(error);
});

module.exports = client