/*
* --- Day 8: Resonant Collinearity ---
*           --- Part One ---
*          Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})

const grid = []
const antennas = new Map()

function printGrid() {
    grid.forEach(row => console.log(row.join('')))
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
    //printGrid()
    getAntennas()
    console.log(antennas)
    // Result:
})
