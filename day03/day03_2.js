/*
* --- Day 3: Mull It Over ---
*       --- Part Two ---
*      Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day03.txt')
})

const enablers = [ "do()", "don't()" ]
const commands = [ "mul(", ...enablers ]
let [res, enabled, waitingNum1, waitingNum2, accumulator, num1, num2] = [0, true, false, false, '', '', '']

function reset() {
    waitingNum1 = false
    waitingNum2 = false
    accumulator = ""
    num1 = ""
    num2 = ""
}

function process(char) {
    accumulator += char
    if (!waitingNum1 && !waitingNum2) {
        if (commands.every(command => !command.startsWith(accumulator))) reset()
        if (enablers.includes(accumulator)) {
            enabled = accumulator === "do()"
            reset()
        } else if (enabled && accumulator === "mul(") waitingNum1 = true
    } else if (waitingNum1) {
        if (char === "," && num1.length >= 1 && num1.length <= 3) {
            waitingNum1 = false
            waitingNum2 = true
        }
        else if (!isNaN(parseInt(char))) num1 += char
        else reset()
    } else if (waitingNum2) {
        if (char === ")" && num2.length >= 1 && num2.length <= 3) {
            res += parseInt(num1) * parseInt(num2)
            reset()
        } else if (!isNaN(parseInt(char))) num2 += char
        else reset()
    }
}

lineReader.on('line', line => line.split('').forEach(char => process(char)))

lineReader.on('close', () => {
    console.log('Result:', res)
    // Result: 78683433
})
