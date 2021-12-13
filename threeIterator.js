//         4
//    1          5
// 3    2     7    9


function Three(value, left, right) {
    return {
        value,
        left,
        right,
        [Symbol.iterator]() {
            let
                state = 0,
                cursor
            return {
                next: () => {
                    if (state === 0) {
                        state++
                        return {
                            value: this.value,
                            done: false
                        }
                    }
                    if (state === 1) {
                        if (this.left == null) {
                            state++
                        } else {
                            cursor = cursor || this.left[Symbol.iterator]()
                            const res = cursor.next()
                            if (res.done) {
                                cursor = null
                                state++
                            } else {
                                return res
                            }
                        }
                    }
                    if (state === 2) {
                        if (this.right == null) {
                            state++
                        } else {
                            cursor = cursor || this.right[Symbol.iterator]()
                            return cursor.next()
                        }
                    }
                    return {
                        value: undefined, done: true
                    }
                }
            }
        }
    }
}

const t = Three(
    4,
    Three(1, Three(3), Three(2)),

    Three(5, Three(7), Three(9))
)

for (const el of t) {
    console.log(el)
}