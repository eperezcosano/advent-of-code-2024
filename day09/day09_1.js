/*
* --- Day 9: Disk Fragmenter ---
*         --- Part One ---
*        Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day09.txt')
})

let disk

function compactBlocks(blocks) {
    for (let i = blocks.findIndex(elem => isNaN(elem)); i >= 0; i = blocks.findIndex(elem => isNaN(elem))) {
        while (isNaN(blocks[blocks.length - 1])) blocks.pop()
        blocks[i] = blocks.pop()
    }
    return blocks
}

function computeBlocks() {
    const blocks = []
    for (let i = 0, id = 0; i < disk.length; i++) {
        const n = parseInt(disk[i])
        const s = (i % 2 === 0) ? id++ : NaN
        blocks.push(...Array(n).fill(s))
    }
    return blocks
}

lineReader.on('line', line => disk = line)

lineReader.on('close', () => {
    const blocks = computeBlocks()
    const compact = compactBlocks(blocks)
    const res = compact.reduce((acc, num, i) => acc + i * num, 0)
    console.log('Result', res)
    // Result: 6307275788409
})
