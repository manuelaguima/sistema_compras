const conn = require('./db/conn')
const { Usuario, Compra, Produto } = require('./model/rel')

async function SyncDatabase() {
    try{
        await conn.sync({force: true})
        console.log('Criando e Sincronizando a as tabelas')
    }catch(err){
        console.error('Não foi possível conectar com banco de dados',err)
    }finally{
        conn.close()
        console.log('Fechando a conexão com o banco de dados!')
    }
}

SyncDatabase()