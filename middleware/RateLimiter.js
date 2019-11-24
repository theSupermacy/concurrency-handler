const counter = require('./../cache/Counter')
const MAX_RETRY = 50
const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))
const rateLimiter = async function (req, res, next) {
    const instance = await counter.getInstance()
    const apiPath = req.originalUrl
    const method = req.method
    const key = `${method}-${apiPath}`
    const requestLimit = await instance.getCounterKey(key)

    let overLoadError = new Error('Too many Request')
    if (requestLimit >= MAX_RETRY) return next(overLoadError)
    const incrementedCounter = await instance.incrementCounter(key)
    console.log('incrementedCounter=', incrementedCounter)
    const oldResponseSend = res.send
    const send = async function () {
        // simulating sleep
        await sleep(2000)
        console.trace('SLEEP khatam')
        const counter = await instance.decrementCounter(key)
        console.log('counter', counter)
        if (counter < 0) await instance.resetCounter(key)
        oldResponseSend.apply(res, arguments)
    }
    res.send = send
    // if(requestLimit < MAX_RETRY) return next()
    // const currentCounter = await instance.getCounterKey(key)
    // if(currentCounter<)
    return next()
}


module.exports = rateLimiter