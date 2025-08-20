/*
* --- Day 12: Garden Groups ---
*      --- Part Two ---
*     Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day12.txt')
})

const grid = []

function getGroups() {
    const groups = []
    const seen = new Set()
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (seen.has([y, x].join())) continue
            seen.add([y, x].join())
            const group = new Set([[y, x].join()])
            const queue = [[y, x]]
            const letter = grid[y][x]
            while (queue.length) {
                const [cy, cx] = queue.shift()
                for (const [ny, nx] of [[cy - 1, cx], [cy + 1, cx], [cy, cx - 1], [cy, cx + 1]]) {
                    if (ny < 0 || nx < 0 || ny >= grid.length || nx >= grid[0].length) continue
                    if (grid[ny][nx] !== letter) continue
                    if (group.has([ny, nx].join())) continue
                    group.add([ny, nx].join())
                    queue.push([ny, nx])
                    seen.add([ny, nx].join())
                }
            }
            groups.push(group)
        }
    }
    return groups
}

function getSides(group) {
    const corners = new Set()
    for (const str of group) {
        const [cy, cx] = str.split(',').map(Number)
        for (const [ccy, ccx] of [[cy - 0.5, cx - 0.5], [cy + 0.5, cx - 0.5], [cy + 0.5, cx + 0.5], [cy - 0.5, cx + 0.5]]) {
            corners.add([ccy, ccx].join())
        }
    }
    let count = 0
    for (const str of corners) {
        const [ccy, ccx] = str.split(',').map(Number)
        const config = [[ccy - 0.5, ccx - 0.5], [ccy + 0.5, ccx - 0.5], [ccy + 0.5, ccx + 0.5], [ccy - 0.5, ccx + 0.5]]
                        .map(([csy, csx]) => group.has([csy, csx].join()))
        const sum = config.reduce((acc, val) => acc + val, 0)
        if (sum === 1 || sum === 3) count++
        else if (sum === 2 && (config.toString() === [true, false, true, false].toString() || config.toString() === [false, true, false, true].toString())) {
            count += 2
        }
    }
    return count
}

lineReader.on('line', line => grid.push(line.split('')))

lineReader.on('close', () => {
    const groups = getGroups()
    const res = groups.reduce((acc, group) => acc + group.size * getSides(group), 0)
    console.log('Result:', res)
    // Result: 834828
})
