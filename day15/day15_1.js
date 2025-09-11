/*
* --- Day 15: Warehouse Woes ---
*      --- Part One ---
*     Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day15.txt')
})

let [ry, rx] = [0, 0]
const grid = []
const movements = []

function getRobot() {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === '@') {
                [ry, rx] = [y, x]
                return
            }
        }
    }
}

function run() {
    const dirs = { '^': [-1, 0], '>': [0, 1], 'v': [1, 0], '<': [0, -1] }
    for (const movement of movements) {
        const [dy, dx] = dirs[movement]
        for (
            let y = ry + dy, x = rx + dx; 
            y >= 0 && x >= 0 && y < grid.length && x < grid[0].length;
            y += dy, x += dx
        ) {
            if (grid[y][x] === '#') break
            if (grid[y][x] === '.') {
                grid[ry][rx] = '.'
                if (grid[ry + dy][rx + dx] === 'O') grid[y][x] = 'O'
                grid[ry + dy][rx + dx] = '@'
                ry += dy
                rx += dx
                break
            }
        }
    }
}

function gps() {
    let sum = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 'O') sum += 100 * y + x
        }
    }
    return sum
}

let lineBreak
lineReader.on('line', line => {
    if (line.length === 0) {
        lineBreak = true
        return
    }
    if (lineBreak) {
        movements.push(...line.split(''))
    } else {
        grid.push(line.split(''))
    }
})

lineReader.on('close', () => {
    getRobot()
    run()
    const res = gps()
    console.log('Result:', res)
    // Result: 1476771
})
