class Iter {
    constructor(iter) {
        this.iter = iter
    }

    *[Symbol.iterator]() {
        yield* this.iter
    }

    filter(pred) {
        const {iter} = this
        const newIter = (function* () {
            for (const el of iter) {
                if (pred(el)) {
                    yield el
                }
            }
        })()
        return new Iter(newIter)
    }

    map(fn) {
        const {iter} = this
        const newIter = (function* () {
            for (const el of iter) {
                yield fn(el)
            }
        })()
        return new Iter(newIter)
    }

    take(n) {
        const {iter} = this
        const newIter = (function* () {
            if (n <= 0) {
                return
            }
            for (const el of iter) {
                yield el
                n--
                if (n <= 0) {
                    return
                }
            }
        })()
        return new Iter(newIter)
    }

    enumerate() {
        const {iter} = this
        const newIter = (function* () {
            let i = 0
            for (const el of iter) {
                yield [i, el]
                i++
            }
        })()
        return new Iter(newIter)
    }
}

const iter = new Iter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])


for (const [i, el] of iter.take(12).filter((el) => el > 1).enumerate()) {
    if (i % 2 === 0) {
        console.log(el)
    }
}

