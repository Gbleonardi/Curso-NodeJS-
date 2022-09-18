const express = require('express')
const { userInfo } = require('os')
const app = express()
const port = 3000 // Variavel ambiente

const path = require('path')

const basePath = path.join(__dirname, 'templates')

const checkAuth = function(req, res, next) {

    req.authStatus = true

    if (req.authStatus) {
        console.log('Está logado, pode continuar')
        next()
    } else {
        console.log('não está logado, faça o login para continar')
    }
}

app;userInfo(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);

})

 app.listen(port, () => {

    console.log(`App rodando na porta ${port}`)
 })