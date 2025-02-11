/*
* --- Day 9: Disk Fragmenter ---
*         --- Part Two ---
*        Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day09.txt')
})

const files = []
let blanks = []

lineReader.on('line', line => {
    for (let i = 0, length = 0, from = 0; i < line.length; i++, from += length) {
        length = parseInt(line[i])
        if (i % 2 === 0) {
            files.push([from, length])
        } else {
            if (length !== 0) blanks.push([from, length])
        }
    }
})

lineReader.on('close', () => {
    for (let id = files.length - 1; id >= 0; id--) {
        const [fileStart, fileLength] = files[id]
        for (let i = 0; i < blanks.length; i++) {
            const [blankStart, blankLength] = blanks[i]
            if (blankStart >= fileStart) break
            if (blankLength < fileLength) continue
            files[id] = [blankStart, fileLength]
            if (fileLength === blankLength) blanks = blanks.filter(blank => blank !== blanks[i])
            else blanks[i] = [blankStart + fileLength, blankLength - fileLength]
            break
        }
    }
    const res = files.reduce((acc, [x, y], i) => acc + i * y * (x + (y - 1) / 2), 0)
    console.log('Result', res)
    // Result: 6327174563252
})
