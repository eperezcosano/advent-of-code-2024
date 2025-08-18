/*
* --- Day 11: Plutonian Pebbles ---
*         --- Part Two ---
*        Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day11.txt')
})

const stones = []
const cache = new Map()

function count(stone, steps) {
    const key = [stone, steps].join()
    if (cache.has(key)) return cache.get(key)

    let res
    if (steps === 0) res = 1
    else if (stone === 0) res = count(1, steps - 1)
    else {
        const str = stone.toString()
        const len = str.length
        if (len % 2 === 0) {
            const left = parseInt(str.slice(0, len / 2))
            const right = parseInt(str.slice(len / 2))
            res = count(left, steps - 1) + count(right, steps - 1)
        } else {
            res = count(stone * 2024, steps - 1)
        }
    }
    cache.set(key, res)
    return res
}

lineReader.on('line', line => stones.push(...line.split(' ').map(Number)))

lineReader.on('close', () => {
    const res = stones.reduce((acc, stone) => acc + count(stone, 75), 0)
    console.log('Result:', res)
    // Result: 252442982856820
})
