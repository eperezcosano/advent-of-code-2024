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

function isCorrectOrder(arr) {
    const tmp = arr.slice()
    tmp.sort((a, b) => {
        const vals = rules.get(a)
        if (vals && vals.includes(b)) return -1
        return 0
    })
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
    const res = updates.filter(update => isCorrectOrder(update)).reduce((acc, arr) => acc + arr[Math.floor(arr.length / 2)], 0)
    console.log('Result:', res)
    // Result:
})
