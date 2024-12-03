/*
* --- Day 2: Red-Nosed Reports ---
*         --- Part Two ---
*       Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day02.txt')
})

const reports = []

function isSafe(arr) {
    return arr.every((val, i) => i === 0 || Math.sign(val - arr[i - 1]) !== 0 && Math.sign(arr[1] - arr[0]) === Math.sign(val - arr[i - 1]) && Math.abs(val - arr[i - 1]) <= 3)
}

lineReader.on('line', line => reports.push(line.split(' ').map(Number)))

lineReader.on('close', () => {
    const res = reports.reduce((acc, report) => {
        if (isSafe(report)) return ++acc
        for (let i = 0; i < report.length; i++) {
            const sub = [...report.slice(0, i), ...report.slice(i + 1)]
            if (isSafe(sub)) return ++acc
        }
        return acc
    }, 0)
    console.log('Result:', res)
    // Result: 328
})
