const redisConnection = require('./Connector')
let instance = null
const USER_SET_NAME = 'user'

class Users {
    constructor(connection) {
        this.connection = connection
    }
    async addUser(userInfo) {
         await this.connection.sadd(USER_SET_NAME, userInfo)
         return true
    }
    async getAllUsers() {
        const users = await this.connection.smembers(USER_SET_NAME)
        console.log(users, 'testing the users')
        return users
    }
    static async getInstance() {
        if(instance) {
            return instance
        }
        const connection = await redisConnection.connectToRedis()
        instance = new Users(connection)
        return instance
    }
}

module.exports =  Users