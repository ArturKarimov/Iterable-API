function* Switcher() {
    let state = 0
    try {
        while (true) {
            state++
            if (state >= 6) {
                state = 0
            }
            yield state
        }
    }catch (e) {
        if (e === 'error') {
            console.log('Something js code')
        }
    }

}

const switcher = Switcher()

console.log(switcher.next())
console.log(switcher.next())
console.log(switcher.next())
console.log(switcher.next())
console.log(switcher.next())
console.log(switcher.next())
console.log(switcher.next())
console.log(switcher.next())
console.log(switcher.throw('error'))
