/*
* --- Day 3: Mull It Over ---
*       --- Part One ---
*      Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day03.txt')
})

let input = ""

lineReader.on('line', line => input += line)

lineReader.on('close', () => {
    const res = input
        .match(/mul\(\d{1,3},\d{1,3}\)/g)
        .map(mul => mul.match(/\d+/g))
        .reduce((sum, nums) => sum + nums[0] * nums[1], 0)
    console.log('Result:', res)
    // Result: 170068701
})
