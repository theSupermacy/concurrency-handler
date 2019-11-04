const redisConnection = require('./Connector')
let instance = null

class Counter {
    constructor(connection) {
        this.connection = connection
    }
    async incrementCounter(key) {
         await this.connection.incr(key)
         const counter = await this.getCounterKey(key)
         return counter
    }
    async decrementCounter(key) {
        await this.connection.decr(key)
        const counter = await this.getCounterKey(key)
        return counter
    }
    async getCounterKey(key) {
       const data =  await this.connection.get(key)
       return data
    }
    async resetCounter(key) {
        await this.connection.set(key, 0)
    }
    static async getInstance() {
        if(instance) {
            return instance
        }
        const connection = await redisConnection.connectToRedis()
        instance = new Counter(connection)
        return instance
    }
}

module.exports =  Counter