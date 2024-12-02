/*
* --- Day 1: Historian Hysteria ---
*         --- Part One ---
*       Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day01.txt')
})

const [ left, right ] = [ [], [] ]

lineReader.on('line', line => {
    const [ leftNum, rightNum ] = line.split('   ').map(Number)
    left.push(leftNum)
    right.push(rightNum)
})

lineReader.on('close', () => {
    left.sort((a, b) => a - b)
    right.sort((a, b) => a - b)
    const res = left.reduce((acc, val, i) => acc + Math.abs(val - right[i]), 0)
    console.log('Result:', res)
    // Result: 1666427
})
