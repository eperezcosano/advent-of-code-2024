/*
* --- Day 11: Plutonian Pebbles ---
*         --- Part One ---
*        Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day11.txt')
})

const stones = []
const states = new Map()

function blink() {
    const init = stones.join()
    if (states.has(init)) return states.get(init).split(',').map(Number)
    for (let i = 0; i < stones.length; i++) {
        if (stones[i] === 0) stones[i] = 1
        else if (stones[i].toString().length % 2 === 0) {
            const str = stones[i].toString()
            const [left, right] = [str.slice(0, str.length / 2), str.slice(str.length / 2)].map(Number)
            stones[i] = left
            stones.splice(++i, 0, right)
        } else stones[i] *= 2024
    }
    states.set(init, stones.join())
}

lineReader.on('line', line => stones.push(...line.split(' ').map(Number)))

lineReader.on('close', () => {
    for (let n = 0; n < 25; n++) blink()
    console.log('Result:', stones.length)
    // Result: 213625
})
