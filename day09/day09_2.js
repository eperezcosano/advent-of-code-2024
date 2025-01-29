/*
* --- Day 9: Disk Fragmenter ---
*         --- Part Two ---
*        Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day09.txt')
})

let disk

function compactBlocks(blocks) {
    let i, a
    while (blocks.includes(NaN)) {
        while (isNaN(blocks[blocks.length - 1])) blocks.pop()
        i = blocks.findIndex(elem => isNaN(elem))
        //a = blocks.findLastIndex(elem => !isNaN(elem))
        //if (i === -1 || a < i) break
        //blocks[i] = blocks[a]
        blocks[i] = blocks.pop()
        //blocks[a] = NaN
    }
    //if (i !== -1) blocks = blocks.slice(0, i)
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
    // Result:
})
