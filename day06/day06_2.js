/*
*       --- Day 6: Guard Gallivant ---
*              --- Part Two ---
*             Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day06.txt')
})

const grid = []
let [ccy, ccx] = [0, 0]
let [cfy, cfx] = [-1, 0]

function hasLoop(ry, rx) {
    const turns = new Set()
    let [cy, cx, fy, fx] = [ccy, ccx, cfy, cfx]
    for (let [y, x] = [cy, cx]; Math.min(y, x) >= 0 && y < grid.length && x < grid[y].length; y += fy, x += fx) {
        if (Math.min(y + fy, x + fx) >= 0 && (y + fy) < grid.length && (x + fx) < grid[0].length && ((y + fy === ry && x + fx === rx) || grid[y + fy][x + fx] === '#')) {
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
        ccy = grid.length
        ccx = line.indexOf('^')
    }
    grid.push(line.split(''))
})

lineReader.on('close', () => {
    const res = runPossibilities()
    console.log('Result:', res)
    // Result:
})
//too high 1825