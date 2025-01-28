/*
* --- Day 7: Bridge Repair ---
*       --- Part Two ---
*      Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day07.txt')
})

const equations = []

function evaluate({ res, nums }) {
    for (let i = 0; i < 3 ** (nums.length - 1); i++) {
        let pattern = i
        const mask = []
        for (let j = 0; j < nums.length - 1; j++) {
            mask.unshift(pattern % 3)
            pattern = Math.floor(pattern / 3)
        }
        let total = nums[0]
        for (let j = 0; j < nums.length - 1; j++) {
            const nextNum = nums[j + 1]
            if (mask[j] === 0) total += nextNum
            else if (mask[j] === 1) total *= nextNum
            else if (mask[j] === 2) total = parseInt(`${total}${nextNum}`)
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
    // Result: 492383931650959
})
