function* intoIter(obj) {
    if (obj == null) {
        return
    }
    if (obj[Symbol.iterator] != null) {
        yield* obj[Symbol.iterator]()
        return
    }
    if (typeof obj === 'object') {
        for (const key in obj) {
            yield obj[key]
        }
        return
    }
    yield obj
}

const a = {
    a: 1,
    b: 2,
    c: 3
}

const iter = intoIter(a)

for (const el of iter) {
    console.log(el)
}