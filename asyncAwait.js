//async await in generator

function* fetchSomething() {
    const a = yield fetch('url1')
    const b = yield fetch('url2')
    return [a, b]
}

function executer(iter, value) {
    const
        res = iter.next(value)
    const
        promise = Promise.resolve(res.value)
    if (res.done) {
        return promise
    }

    return promise.then((val) => executer(iter, val), (err) => {
            const res = iter.throw(err)
        if (res.done) {
            return res.value
        }
        return executer(iter, res.value)
    })
}

executer(fetchSomething()).then((val) => {
    console.log(val)
}).catch(console.error)