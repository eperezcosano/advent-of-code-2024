/*
* --- Day 1: Historian Hysteria ---
*         --- Part Two ---
*       Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day01.txt')
})

const left = []
const right = new Map()

lineReader.on('line', line => {
    const [ leftNum, rightNum ] = line.split('   ').map(Number)
    left.push(leftNum)
    right.has(rightNum) ? right.set(rightNum, right.get(rightNum) + 1) : right.set(rightNum, 1)
})

lineReader.on('close', () => {
    const res = left.reduce((acc, val) => acc + val * (right.has(val) ? right.get(val) : 0), 0)
    console.log('Result:', res)
    // Result: 24316233
})
