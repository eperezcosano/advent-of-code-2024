/*
* --- Day 7: Bridge Repair ---
*       --- Part One ---
*      Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day07.txt')
})

const equations = []

function evaluate({ res, nums }) {
    const combinations = 2 ** (nums.length - 1)
    const maxBits = (combinations - 1).toString(2).length
    for (let i = 0; i < combinations; i++) {
        const bits = i.toString(2).padStart(maxBits, '0')
        let total = nums[0]
        for (let j = 0; j < maxBits; j++) {
            const nextNum = nums[j + 1]
            bits[j] === '0' ? total += nextNum : total *= nextNum
        }
        if (total === res) return res
    }
    return 0
}

lineReader.on('line', line => {
    const nums = line.replace(':', '').split(' ').map(Number)
    equations.push({ res: nums.shift(), nums})
})

lineReader.on('close', () => {
    const res = equations.reduce((acc, eq) => acc + evaluate(eq), 0)
    console.log('Result:', res)
    // Result: 5837374519342
})
