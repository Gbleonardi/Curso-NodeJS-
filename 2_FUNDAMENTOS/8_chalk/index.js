const chalk = require("chalk")


const notaM = 1
const notaP = 2
const notaH = 1

media = (notaM + notaP + notaH)/3


if(media >= 5) {
    console.log(chalk.green.bold('Parabéns! Voce está aprovado!'))

} else {

if(media <= 4) {
    console.log(chalk.bgRed.black("Voce precisa fazer a prova de recupeção!"))
}}
 
