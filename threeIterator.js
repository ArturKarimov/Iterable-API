//          4
//     1          5
//  3    2     7    9
//8


function Three2(value, left, right) {
    return {
        value,
        left,
        right,
        [Symbol.iterator]() {
            let
                state = 0,
                cursor
            return {
                [Symbol.iterator]() {
                    return this
                },
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


function Three3(value, left, right) {
    return {
        value,
        left,
        right,
        *[Symbol.iterator]() {
            yield this.value

            if (this.left != null) {
                for (const el of this.left) {
                    yield el
                }
            }
            if (this.right != null) {
                for (const el of this.right) {
                    yield el
                }
            }
        }
    }
}

function Three(value, left, right) {
    return {
        value,
        left,
        right,
        *[Symbol.iterator]() {
            yield this.value

            if (this.left != null) {
                yield* this.left
            }
            if (this.right != null) {
                yield* this.right
            }
        }
    }
}

const t = Three(
    4,
    Three(1, Three(3, Three(8)), Three(2)),

    Three(5, Three(7), Three(9))
)

for (const el of t) {
    console.log(el)
}
