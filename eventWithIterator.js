// 1. {done: false, value: Promise(e)}
// 2. Promise({done: false, value: e})


//1
function on(el, event) {

    let cb

    el.addEventListener(event, (e) => {
        if (cb != null) {
            cb(e)
            cb = null
        }
    })
    return {
        [Symbol.iterator]() {
            return this
        },

        next() {
            return {
                done: false,
                value: new Promise((resolve) => {
                    cb = resolve
                })
            }
        }
    }
}

async function* on2(el, event) {
    let cb
    el.addEventListener(event, (e) => {
        if (cb != null) {
            cb(e)
            cb = null
        }
    })
    while (true) {
        await new Promise((resolve) => {
            cb = resolve
        })
    }
}


(async () => {
    for await (const e of on2(document, 'click')) {
        console.log(e)
    }
})()