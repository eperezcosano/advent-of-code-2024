/*
* --- Day 10: Hoof It ---
*     --- Part Two ---
*    Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day10.txt')
})

const grid = []

function getAdj(cy, cx) {
    const neighbours = []
    if (cy > 0  && grid[cy][cx] + 1 === grid[cy - 1][cx]) neighbours.push([cy - 1, cx])
    if (cx < grid[cy].length  && grid[cy][cx] + 1 === grid[cy][cx + 1]) neighbours.push([cy, cx + 1])
    if (cy < grid.length - 1 && grid[cy][cx] + 1 === grid[cy + 1][cx]) neighbours.push([cy + 1, cx])
    if (cx > 0  && grid[cy][cx] + 1 === grid[cy][cx - 1]) neighbours.push([cy, cx - 1])
    return neighbours
}

function walk(start) {
    const queue = [start]
    let paths = 0
    while (queue.length) {
        const [cy, cx] = queue.shift()
        if (grid[cy][cx] === 9) paths++
        queue.push(...getAdj(cy, cx))
    }
    return paths
}

lineReader.on('line', line => grid.push(line.split('').map(Number)))

lineReader.on('close', () => {
    let res = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 0) res += walk([y, x])
        }
    }
    console.log('Result:', res)
    // Result: 1942
})
