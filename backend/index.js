const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT
const hostname = 'localhost'

const conn = require('./db/conn')
const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
const compraController = require('./controller/compra.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/usuario/lote', usuarioController.cadastrarLote)
app.post('/produto/lote', produtoController.cadastrarLote)

app.post('/usuario', usuarioController.cadastrar)
app.get('/usuario', usuarioController.listar)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)
// app.get('/usuario/grafico', usuarioController.grafico)

app.post('/produto', produtoController.cadastrar)
app.get('/produto', produtoController.listar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

app.post('/compra', compraController.cadastrar)
app.get('/compra', compraController.listar)
app.put('/compra/:idCompra', compraController.atualizar)
app.delete('/compra/:idCompra', compraController.apagar)


app.get('/', (req,res)=>{
    res.status(200).json({message: "Aplicação rodando com sucesso !!!!!"})
})

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em: http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Não foi possível fazer a sincronização com o Banco de Dados',err)
})