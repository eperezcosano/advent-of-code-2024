/*
*       --- Day 6: Guard Gallivant ---
*              --- Part One ---
*             Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day06.txt')
})

const grid = []
const positions = new Set()
let [cy, cx] = [0, 0]
let [fy, fx] = [-1, 0]

function walk() {
    for (let [y, x] = [cy, cx]; Math.min(y, x) >= 0 && y < grid.length && x < grid[y].length; y += fy, x += fx) {
        if (Math.min(y + fy, x + fx) >= 0 && (y + fy) < grid.length && (x + fx) < grid[0].length && grid[y + fy][x + fx] === '#') {
            let ty = fy
            fy = fx
            fx = -ty
        }
        positions.add([y, x].join())
    }
}

lineReader.on('line', line => {
    if (line.includes('^')) {
        cy = grid.length
        cx = line.indexOf('^')
    }
    grid.push(line.split(''))
})

lineReader.on('close', () => {
    walk()
    console.log('Result:', positions.size)
    // Result: 5239
})
