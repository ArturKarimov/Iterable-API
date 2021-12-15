function lazyConcat(...arrays) {
    const newArray = new Array(arrays.reduce((l, a) => l + a.length, 0))
    newArray[Symbol.iterator] = function* () {
        for (const array of arrays) {
            yield* array[Symbol.iterator]()
        }
    }
    return newArray
}

const iter = lazyConcat([1,2,3], [7,8,9], ['a','b','c'])

for (const el of iter) {
    console.log(el)
}