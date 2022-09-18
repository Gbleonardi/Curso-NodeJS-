const express = require('express')
const { userInfo } = require('os')
const app = express()
const port = 3000 // Variavel ambiente

const path = require('path')

// ler o body
app.use(
    express.urlencoded({

    }),
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.get(`/users/add`, (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`O nome do usuario é ${name} e ele tem ${age} anos`)

    res.sendFile(`${basePath}/userform.html`)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    // Leitura da tabela users, resgatar um usuario do banco
    console.log(`Estamos buscamos pelo usuario: ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {

    console.log(`App rodando na porta ${port}`)
})
