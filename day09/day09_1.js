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
    while (blocks.includes('.')) {
        while (blocks[blocks.length - 1] === '.') blocks.pop()
        const i = blocks.findIndex(elem => elem === '.')
        blocks[i] = blocks.pop()
    }
    return blocks.map(Number)
}

function computeBlocks() {
    let blocks = ""
    for (let i = 0, id = 0; i < disk.length; i++) {
        const n = parseInt(disk[i])
        const s = (i % 2 === 0) ? `${id++}` : '.'
        blocks += s.repeat(n)
    }
    return blocks.split('')
}

lineReader.on('line', line => disk = line)

lineReader.on('close', () => {
    const blocks = computeBlocks()
    const compact = compactBlocks(blocks)
    const res = compact.reduce((acc, num, i) => acc + i * num, 0)
    console.log('Result', res)
    // Result:
})
// too low 89425419840