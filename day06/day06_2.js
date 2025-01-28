/*
*       --- Day 6: Guard Gallivant ---
*              --- Part Two ---
*             Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day06.txt')
})

const grid = []
let [sy, sx] = [0, 0]

function hasLoop(oy, ox) {
    const turns = new Set()
    for (let [y, x, fy, fx] = [sy, sx, -1, 0]; Math.min(y, x) >= 0 && y < grid.length && x < grid[y].length; y += fy, x += fx) {
        while (Math.min(y + fy, x + fx) >= 0 && (y + fy) < grid.length && (x + fx) < grid[0].length && (grid[y + fy][x + fx] === '#' || (y + fy === oy && x + fx === ox))) {
            if (turns.has([y, x, fy, fx].join())) return true
            turns.add([y, x, fy, fx].join())
            let ty = fy
            fy = fx
            fx = -ty
        }
    }
    return false
}

function runPossibilities() {
    let count = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '#') continue
            if (hasLoop(y, x)) count++
        }
    }
    return count
}

lineReader.on('line', line => {
    if (line.includes('^')) {
        sy = grid.length
        sx = line.indexOf('^')
    }
    grid.push(line.split(''))
})

lineReader.on('close', () => {
    const res = runPossibilities()
    console.log('Result:', res)
    // Result: 1753
})
