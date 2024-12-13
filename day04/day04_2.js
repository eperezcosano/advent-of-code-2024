/*
* --- Day 4: Ceres Search ---
*      --- Part Two ---
*     Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day04.txt')
})

const grid = []

function isXMAS(y, x) {
    const desc = [grid[y - 1][x - 1], grid[y + 1][x + 1]]
    const asc = [grid[y + 1][x - 1], grid[y - 1][x + 1]]
    return [desc.join(''), desc.reverse().join('')].includes('MS') && [asc.join(''), asc.reverse().join('')].includes('MS')
}

function findXMAS() {
    let count = 0
    for (let y = 1; y < grid.length - 1; y++) {
        for (let x = 1; x < grid[y].length - 1; x++) {
            if (grid[y][x] === 'A') isXMAS(y, x) ? count++ : null
        }
    }
    return count
}

lineReader.on('line', line => grid.push(line.split('')))

lineReader.on('close', () => {
    const res = findXMAS()
    console.log('Result:', res)
    // Result: 1912
})
