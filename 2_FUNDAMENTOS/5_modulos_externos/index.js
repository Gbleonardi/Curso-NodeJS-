const minimist = require("minimist")


const args = minimist(process.argv.slice(2))

console.log(args)

const nome = args['nome']
const profissao = args['profissao']
const idade = args['idade']
const sexo = args['sexo']

console.log(nome, profissao, idade, sexo)

console.log(`O nome dele é ${nome}, sua profissão é ${profissao}, tem a idade de ${idade} anos, seu sexo é ${sexo}`)