const a = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]() {
        let cursor = 0
        const keys = Object.keys(this)
        return {
            next: () => {
                const currentCursor = cursor
                cursor++
                return {
                    value: this[keys[currentCursor]],
                    done: currentCursor >= keys.length
                }
            }
        }
    }

}

for (const el of a) {
    console.log(el)
}
