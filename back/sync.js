require('dotenv').config()
const conn = require('./db/conn')
const Usuario = require('./model/Usuario')
const Produto = require('./model/Produto')
const Compra = require('./model/Compra')

async function sincronizarBancoDeDados() {
    try {
        await Compra.drop({ force: true });
        console.log('Tabela Compra removida com sucesso (se existir).');
        await Produto.drop({ force: true });
        console.log('Tabela Produto removida com sucesso (se existir).');
        await Usuario.drop({ force: true });
        console.log('Tabela Usuario removida com sucesso (se existir).');
        await Usuario.sync({ force: true });
        console.log('Tabela Usuario criada com sucesso.');
        await Produto.sync({ force: true });
        console.log('Tabela Produto criada com sucesso.');
        await Compra.sync({ force: true });
        console.log('Tabela Compra criada com sucesso.');

        console.log('Tabelas sincronizadas e Banco de dados atualizado!');
    } catch (err) {
        console.error('Não foi possível criar as tabelas e sincronizar o BD!', err);
    } finally {
        await conn.close();
        console.log('Banco de dados fechado!');
    }
}

sincronizarBancoDeDados();