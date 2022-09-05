const path = require('path')


// Path absoluto
console.log(path.resolve("teste.txt"))


// formar path

const midFolder = "realatorios"
const fileName = "Gabriel.txt"

const finalPath = path.join('/', 'arquivos', midFolder, fileName)

console.log(finalPath)