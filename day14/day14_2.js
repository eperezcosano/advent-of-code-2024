/*
* --- Day 14: Restroom Redoubt ---
*        --- Part Two ---
*       Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})

const [cols, rows] = [11, 7]
const robots = []

function mod(n, m) {
    return ((n % m) + m) % m
}

function move() {
    for (let i = 0; i < robots.length; i++) {
        const [[px, py], [vx, vy]] = robots[i]
        const x = px + vx * 100
        const y = py + vy * 100
        robots[i] = [[mod(x, cols), mod(y, rows)], [vx, vy]]
    }
}

function safetyFactor() {
    const quadrants = [0, 0, 0, 0]
    const [y, x] = [(rows - 1) / 2, (cols - 1) / 2]
    for (const [[px, py]] of robots) {
        if (px < x && py < y) quadrants[0]++
        else if (px > x && py < y) quadrants[1]++
        else if (px < x && py > y) quadrants[2]++
        else if (px > x && py > y) quadrants[3]++
    }
    return quadrants.reduce((acc, val) => acc * val, 1)
}

lineReader.on('line', line => {
    const [[px, py], [vx, vy]] = line.split(' ').map(str => str.slice(2).split(',').map(Number))
    robots.push([[px, py], [vx, vy]])
})

lineReader.on('close', () => {
    move()
    const res = safetyFactor()
    console.log('Result:', res)
    // Result:
})

function printGrid() {
    const grid = Array(rows).fill(false).map(() => new Array(cols).fill('.'))
    for (const [[px, py]] of robots) {
        if (grid[py][px] === '.') grid[py][px] = 1
        else grid[py][px]++
    }
    grid.forEach(row => console.log(row.join('')))
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (y === (rows - 1) / 2 || x === (cols - 1) / 2) grid[y][x] = ' '
        }
    }
    grid.forEach(row => console.log(row.join('')))
}
