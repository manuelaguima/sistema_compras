const { Sequelize } = require('sequelize')
require('dotenv').config()

console.log(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,)

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

sequelize.authenticate()
.then(()=>{
    console.log('Conexão realizada com sucesso!')
})
.catch((err)=>{
    console.error('Não foi possível conectar com o banco de dados!',err)
})

module.exports = sequelize