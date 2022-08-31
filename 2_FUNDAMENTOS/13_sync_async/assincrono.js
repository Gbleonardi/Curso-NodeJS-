const fs = require("fs")

console.log("inicio")

fs.writeFile("arqivo.txt", "oi", function (err){
    setTimeout(function(){
        console.log("arequivo criado")
    }, 1000)    
})


console.log("fim")