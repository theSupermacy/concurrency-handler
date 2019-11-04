const counter = require('./../cache/Counter')
const MAX_RETRY = 50
const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))
const rateLimiter = async function(req, res, next) {
    const instance = await counter.getInstance()
    const apiPath = req.originalUrl
    const method = req.method
    const key = `${method}-${apiPath}`
    await instance.incrementCounter(key)
    const requestLimit = await instance.getCounterKey(key)
    const oldResponseSend = res.send
    const send = async function() {
        // simulating sleep
        await sleep(2000)
        console.log('SLEEP khatam')
        const counter = await instance.decrementCounter(key)
        console.log('counter')
        if(counter < 0) await instance.resetCounter(key)
        oldResponseSend.apply(res, arguments)
    }
    res.send = send
    // if(requestLimit < MAX_RETRY) return next()
    // const currentCounter = await instance.getCounterKey(key)
    // if(currentCounter<)
    // let overLoadError = new Error('Too many Request')
    return next(overLoadError)
} 


module.exports = rateLimiter