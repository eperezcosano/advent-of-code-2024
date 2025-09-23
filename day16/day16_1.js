/*
* --- Day 16: Reindeer Maze ---
*       --- Part One ---
*      Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day16.txt')
})

const maze = []
const queue = []

function swap(n, m) {
    const tmp = queue[n]
    queue[n] = queue[m]
    queue[m] = tmp
}

function enqueue(element) {
    queue.push(element)
    let n = queue.length - 1
    while (n > 0) {
        const p = Math.floor((n - 1) / 2)
        if (queue[p][0] <= queue[n][0]) break
        swap(p, n)
        n = p
    }
}

function dequeue() {
    if (queue.length == 0) return null
    const element = queue[0]
    queue[0] = queue[queue.length - 1]
    queue.pop()
    let n = 0
    while (true) {
        const l = 2 * n + 1
        const r = l + 1
        if (l >= queue.length) break
        const c = (r < queue.length && queue[r][0] < queue[l][0]) ? r : l
        if (queue[n][0] < queue[c][0]) break
        else swap(n, c)
        n = c
    }
    return element
}

function dijkstra() {
    const [sy, sx] = [maze.length - 2, 1]
    const [ey, ex] = [1, maze[0].length - 2]

    const seen = new Set()
    enqueue([0, sy, sx, 0, 1])

    while (queue.length) {
        const [p, y, x, dy, dx] = dequeue()
        seen.add([y, x, dy, dx].join())

        if (y === ey && x === ex) return p

        for (const [np, ny, nx, ndy, ndx] of [
            [p + 1, y + dy, x + dx, dy, dx],
            [p + 1e3, y, x, dx, -dy + 0],
            [p + 1e3, y, x, -dx + 0, dy]
        ]) {
            if (maze[ny][nx] === '#') continue
            if (seen.has([ny, nx, ndy, ndx].join())) continue
            enqueue([np, ny, nx, ndy, ndx])
        }
    }
}

lineReader.on('line', line => maze.push(line.split('')))

lineReader.on('close', () => {
    const res = dijkstra()
    console.log('Result:', res)
    // Result: 135512
})
