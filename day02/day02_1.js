/*
* --- Day 2: Red-Nosed Reports ---
*         --- Part One ---
*       Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day02.txt')
})

let res = 0

lineReader.on('line', line => {
    const arr = line.split(' ').map(Number)
    res += arr.every((val, i) => i === 0 || Math.sign(val - arr[i - 1]) !== 0 && Math.sign(arr[1] - arr[0]) === Math.sign(val - arr[i - 1]) && Math.abs(val - arr[i - 1]) <= 3) ? 1 : 0
})

lineReader.on('close', () => {
    console.log('Result:', res)
    // Result: 257
})
