const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT
const hostname = 'localhost'

// DB
const conn = require('./db/conn')

// Controllers
const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
const compraController = require('./controller/compra.controller')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Rotas Usuario
app.post('/usuario/lote', usuarioController.cadastrarLote)
app.post('/usuario', usuarioController.cadastrar)
app.get('/usuario', usuarioController.listar)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)
app.get('/usuario/grafico', usuarioController.listarUsuariosGrafico)

// Rotas Produto
app.post('/produto/lote', produtoController.cadastrarLote)
app.post('/produto', produtoController.cadastrar)
app.get('/produto', produtoController.listar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

// Rotas Compra
app.post('/compra', compraController.cadastrar)
app.get('/compra', compraController.listar)
app.put('/compra/:id', compraController.atualizar)
app.delete('/compra/:id', compraController.apagar)

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({ message: "Aplicação rodando com sucesso!" })
})

// Conectar DB e iniciar servidor
conn.sync()
  .then(() => {
    app.listen(PORT, hostname, () => {
      console.log(`Servidor rodando em: http://${hostname}:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Erro ao sincronizar com o Banco de Dados:', err)
  })
