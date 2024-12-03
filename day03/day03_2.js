/*
* --- Day 3: Mull It Over ---
*       --- Part Two ---
*      Advent Of Code 2024
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day03.txt')
})

let input = ""

let res = 0

let enabled = true
let waitingNum1 = false
let waitingNum2 = false
let accumulator = ""
let num1 = ""
let num2 = ""

function reset() {
    waitingNum1 = false
    waitingNum2 = false
    accumulator = ""
    num1 = ""
    num2 = ""
}

function process(char) {

    if (!waitingNum1 && !waitingNum2) {

        if ("mul(".startsWith(accumulator + char) || "do()".startsWith(accumulator + char) || "don't()".startsWith(accumulator + char)) accumulator += char
        if (accumulator === "do()") {
            enabled = true
            reset()
        }
        else if (accumulator === "don't()") {
            enabled = false
            reset()
        }
        else if (enabled && accumulator === "mul(") waitingNum1 = true
        else reset()
    }

    if (waitingNum1) {
        if (char === "," && num1.length >= 1 && num1.length <= 3) {
            waitingNum1 = false
            waitingNum2 = true
            return
        }
        else if (!isNaN(parseInt(char))) num1 += char
        else reset()

    }

    if (waitingNum2) {
        if (char === ")" && num2.length >= 1 && num2.length <= 3) {
            //console.log(num1, num2)
            res += parseInt(num1) * parseInt(num2)
            reset()
        } else if (!isNaN(parseInt(char))) num2 += char
        else reset()
    }
}

lineReader.on('line', line => line.split('').forEach(char => process(char)))

lineReader.on('close', () => {
    console.log('Result:', res)
    // Result:
})

// Too low 77771310
