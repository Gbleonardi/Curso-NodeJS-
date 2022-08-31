const http = require("http")

const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('contety-type', 'text/html')
  res.end('<h1>Olá esse é meu primeiro server com html!</h1><p>Testando a autalização</p>')

    
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})