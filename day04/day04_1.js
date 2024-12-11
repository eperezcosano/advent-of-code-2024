/*
* --- Day 4: Ceres Search ---
*      --- Part One ---
*     Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day04.txt')
})

const word = "XMAS"
const grid = []

// Too low 2492

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
        const arr = []
        for (let y = 0; y < grid.length; y++) {
            arr.push(grid[y][x])
        }
        count += findWordInLine(arr)
    }
    return count
}

function findDiagonalDesc() {
    let count = 0
    for (let x = 0; x <= grid[0].length - word.length; x++) {
        const arr = []
        for (let d = 0; d + x < grid[0].length; d++) {
            arr.push(grid[d][d + x])
        }
        count += findWordInLine(arr)
    }
    for (let y = 1; y <= grid.length - word.length; y++) {
        let arr = []
        for (let d = 0; d + y < grid.length; d++) {
            arr.push(grid[d + y][d])
        }
        count += findWordInLine(arr)
    }
    return count
}

function findDiagonalAsc() {
    let count = 0
    for (let x = grid[0].length - 1; x >= word.length - 1; x--) {
        const arr = []
        for (let d = 0; x - d >= 0; d++) {
            arr.push(grid[d][x - d])
        }
        count += findWordInLine(arr)
    }
    for (let y = 1; y <= grid.length - word.length; y++) {
        let arr = []
        for (let d = 0; d + y < grid.length; d++) {
            arr.push(grid[d + y][grid[0].length - 1 - d])
        }
        count += findWordInLine(arr)
    }
    return count
}

lineReader.on('line', line => grid.push(line.split('')))

lineReader.on('close', () => {
    const res = findHorizontal() + findVertical() + findDiagonalDesc() + findDiagonalDesc()
    console.log('Result:', res)
    // Result:
})
