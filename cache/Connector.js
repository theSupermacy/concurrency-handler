const bluebird = require('bluebird')
const redis = require('redis')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class RedisConnector {
    constructor() {
        // this.url = process.env["REDIS_URL"]
        this.url = "//redis"
    }
    async connectToRedis() {
        try {
            console.log(`Connecting to ${this.url}`)
            const connection = await redis.createClient({
                url: this.url
            })
            console.log('Connected to Redis at ' + this.url)
            connection.get = bluebird.promisify(connection.get).bind(connection);
            return connection

        }
        catch (ex) {
            console.log(`Unable to connect to Redis Server`, ex)
        }

    }

}

module.exports = new RedisConnector()

