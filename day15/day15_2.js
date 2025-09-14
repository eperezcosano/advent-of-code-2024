/*
* --- Day 15: Warehouse Woes ---
*      --- Part Two ---
*     Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day15.txt')
})

let [ry, rx] = [0, 0]
const grid = []
const movements = []

function resize() {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length * 2; x += 2) {
            if (grid[y][x] === '#') grid[y].splice(x + 1, 0, '#')
            else if (grid[y][x] === '.' || grid[y][x] === '@') grid[y].splice(x + 1, 0, '.')
            else if (grid[y][x] === 'O') {
                grid[y][x] = '['
                grid[y].splice(x + 1, 0, ']')
            } 
        }
    }
}

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
        if (dx !== 0) {
            for (let x = rx + dx; x >= 0 && x < grid[0].length; x += dx) {
                if (grid[ry][x] === '#') break
                if (grid[ry][x] === '.') {
                    grid[ry].splice(x, 1)
                    grid[ry].splice(rx, 0, '.')
                    rx += dx
                    break
                }
            }
        } else {
            const range = [[ry + dy, rx]]
            const slots = new Set()
            let canMove = true
            while (range.length) {
                const [cy, cx] = range.shift()
                slots.add([cy, cx].join())
                if (grid[cy][cx] === '#') {
                    canMove = false
                    break
                }
                if (grid[cy][cx] === '[') range.push([cy + dy, cx], [cy + dy, cx + 1])
                else if (grid[cy][cx] === ']') range.push([cy + dy, cx], [cy + dy, cx - 1])
            }
            if (canMove) {
                for (const val of [...slots].reverse()) {
                    const [sy, sx] = val.split(',').map(Number)
                    grid[sy][sx] = grid[sy - dy][sx]
                    grid[sy - dy][sx] = '.'
                }
                grid[ry][rx] = '.'
                grid[ry + dy][rx] = '@'
                ry += dy
            }
        }
    }
}

function gps() {
    let sum = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === '[') sum += 100 * y + x
        }
    }
    return sum
}

let lineBreak
lineReader.on('line', line => {
    if (line.length === 0) lineBreak = true
    else if (lineBreak) movements.push(...line.split(''))
    else grid.push(line.split(''))
})

lineReader.on('close', () => {
    resize()
    getRobot()
    run()
    const res = gps()
    console.log('Result:', res)
    // Result: 1468005
})
