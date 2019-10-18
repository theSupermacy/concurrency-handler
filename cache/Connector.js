const bluebird = require('bluebird')
const redis = require('redis')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class RedisConnector {
    constructor() {
        this.url = '//localhost:6379'
    }
    async connectToRedis() {
        try {
            await redis.createClient({
                url: this.url
            })
            console.log('Connected to Redis at ' + this.url)

        }
       catch(ex) {

       }

    }

}

module.exports = new RedisConnector()

