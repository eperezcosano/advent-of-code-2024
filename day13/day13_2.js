/*
* --- Day 13: Claw Contraption ---
*        --- Part Two ---
*       Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day13.txt')
})

const machines = []

function presses([[ax, ay], [bx, by], [x, y]]) {
    x += 1e13
    y += 1e13
    const a = (x * by - bx * y) / (ax * by - bx * ay)
    const b = (ax * y - x * ay) / (ax * by - bx * ay)
    if (!Number.isInteger(a) || !Number.isInteger(b)) return 0
    return a * 3 + b
}

let machineId = 0
lineReader.on('line', line => {
    if (line.length === 0) {
        machineId++
    } else {
        const [ , coords] = line.split(': ')
        const [x, y] = coords.split(', ').map(str => parseInt(str.slice(2)))
        if (machines[machineId]) {
            machines[machineId].push([x, y])
        } else {
            machines.push([[x, y]])
        }
    }
})

lineReader.on('close', () => {
    const res = machines.reduce((acc, val) => acc + presses(val), 0)
    console.log('Result:', res)
    // Result: 89013607072065
})
