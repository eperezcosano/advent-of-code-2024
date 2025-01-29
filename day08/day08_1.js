/*
* --- Day 8: Resonant Collinearity ---
*           --- Part One ---
*          Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day08.txt')
})

const grid = []
const antennas = new Map()
const antinodes = new Set()

function getPairs(points) {
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const [[y1, x1], [y2, x2]] = [points[i], points[j]]
            const [dy, dx, sy, sx] = [Math.abs(y1 - y2), Math.abs(x1 - x2), Math.sign(y1 - y2), Math.sign(x1 - x2)]
            const [ay, ax, by, bx] = [y1 + sy * dy, x1 + sx * dx, y2 - sy * dy, x2 - sx * dx]
            if (Math.min(ay, ax) >= 0 && ay < grid.length && ax < grid[0].length) antinodes.add([ay, ax].join())
            if (Math.min(by, bx) >= 0 && by < grid.length && bx < grid[0].length) antinodes.add([by, bx].join())
        }
    }
}

function getAntennas() {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '.') continue
            antennas.has(grid[y][x]) ? antennas.set(grid[y][x], [...antennas.get(grid[y][x]), [y, x]]) : antennas.set(grid[y][x], [[y, x]])
        }
    }
}

lineReader.on('line', line => grid.push(line.split('')))

lineReader.on('close', () => {
    getAntennas()
    antennas.forEach(antenna => getPairs(antenna))
    const res = antinodes.size
    console.log('Result:', res)
    // Result: 313
})
