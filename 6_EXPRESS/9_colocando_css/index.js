const express = require('express')
const { userInfo } = require('os')
const app = express()
const port = 3000 // Variavel ambiente

const path = require('path')

const users = require('./users')

// ler o body
app.use(
    express.urlencoded({

    }),
)

app.use(express.json())

// arquivos estáticos
app.use(express.static('public'))

const basePath = path.join(__dirname, 'templates')


app.use('/users', users)


app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {

    console.log(`App rodando na porta ${port}`)
})
