/*
* --- Day 4: Ceres Search ---
*      --- Part One ---
*     Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})

const word = "XMAS"
const grid = []

function findWordInLine(arr) {
    let count = 0
    const lines = [arr.join(''), arr.reverse().join('')]
    for (const line of lines) {
        let [index, fromIndex] = [-1, 0]
        do {
            index = line.indexOf(word, fromIndex)
            if (index > -1) {
                fromIndex = index + 1
                count++
            }
        } while (index > -1)
    }
    return count
}

function findHorizontal() {
    let count = 0
    for (let y = 0; y < grid.length; y++) {
        count += findWordInLine(grid[y])
    }
    return count
}

function findVertical() {
    let count = 0
    for (let x = 0; x < grid[0].length; x++) {
        let arr = []
        for (let y = 0; y < grid.length; y++) {
            arr.push(grid[y][x])
        }
        count += findWordInLine(arr)
    }
    return count
}

function findDiagonalDesc() {
    let count = 0
    for (let y = 0; y < grid.length; y++) {

    }
    return count
}

lineReader.on('line', line => grid.push(line.split('')))

lineReader.on('close', () => {
    findVertical()
    // Result:
})
