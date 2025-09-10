/*
* --- Day 14: Restroom Redoubt ---
*        --- Part Two ---
*       Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day14.txt')
})

const [cols, rows] = [101, 103]
const robots = []

function mod(n, m) {
    return ((n % m) + m) % m
}

function move(s) {
    for (let i = 0; i < robots.length; i++) {
        const [[px, py], [vx, vy]] = robots[i]
        const x = px + vx * s
        const y = py + vy * s
        robots[i] = [[mod(x, cols), mod(y, rows)], [vx, vy]]
    }
}

function testChristmassTree() {
    const grid = Array(rows).fill(false).map(() => new Array(cols).fill(' '))
    for (const [[px, py]] of robots) grid[py][px] = '*'
    return grid.some(row => row.join('').includes('*********'))
}

lineReader.on('line', line => {
    const [[px, py], [vx, vy]] = line.split(' ').map(str => str.slice(2).split(',').map(Number))
    robots.push([[px, py], [vx, vy]])
})

lineReader.on('close', () => {
    for (let res = 1; res <= 1e5; res++) {
        move(1)
        if (testChristmassTree()) {
            console.log('Result:', res)
            break
        }
    }
    // Result: 6876
})
