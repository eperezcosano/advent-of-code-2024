/*
*       --- Day 5: Print Queue ---
*           --- Part Two ---
*          Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day05.txt')
})

const rules = new Map()
const updates = []

function comparator(a, b) {
    const vals = rules.get(a)
    if (vals && vals.includes(b)) return -1
    return 0
}

function isCorrectOrder(arr) {
    const tmp = arr.slice()
    tmp.sort((a, b) => comparator(a, b))
    return arr.every((val, i) => val === tmp[i])
}

let breakLine = false
lineReader.on('line', line => {
    if (line.length === 0) breakLine = true
    else if (!breakLine) {
        const [key, val] = line.split('|').map(Number)
        rules.has(key) ? rules.set(key, [...rules.get(key), val]) : rules.set(key, [val])
    } else {
        updates.push(line.split(',').map(Number))
    }
})

lineReader.on('close', () => {
    const incorrect = updates.filter(update => !isCorrectOrder(update))
    incorrect.forEach(arr => arr.sort((a, b) => comparator(a, b)))
    const res = incorrect.reduce((acc, arr) => acc + arr[Math.floor(arr.length / 2)], 0)
    console.log('Result:', res)
    // Result: 6336
})
