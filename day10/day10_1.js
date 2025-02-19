/*
* --- Day 10: Hoof It ---
*     --- Part One ---
*    Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day10.txt')
})

const grid = []

function score([sy, sx]) {
    const queue = []
    const seen = new Set()
    let ends = 0
    queue.push([sy, sx])
    seen.add([sy, sx].join())
    while (queue.length) {
        const [y, x] = queue.shift()
        for (const [ny, nx] of [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]]) {
            if (Math.min(ny, nx) < 0 || ny >= grid.length || nx >= grid[0].length) continue
            if (grid[y][x] + 1 !== grid[ny][nx]) continue
            if (seen.has([ny, nx].join())) continue
            seen.add([ny, nx].join())
            if (grid[ny][nx] === 9) ends++
            else queue.push([ny, nx])
        }
    }
    return ends
}

function getStarts() {
    const starts = []
    for (let y = 0; y < grid.length; y++)
        for (let x = 0; x < grid[0].length; x++)
            if (grid[y][x] === 0) starts.push([y, x])
    return starts
}

lineReader.on('line', line => grid.push(line.split('').map(Number)))

lineReader.on('close', () => {
    const res = getStarts().map(start => score(start)).reduce((acc, val) => acc + val, 0)
    console.log('Result:', res)
    // Result: 796
})
