const Usuario = require('../model/Usuario')

const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        const dados = await Usuario.create(valores)
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao cadastrar os dados!!!!',err)
        res.status(500).json({message: 'Erro ao cadastrar os dados!!!!'})
    }
}

const cadastrarLote = async (req,res)=>{
    const valores = req.body
    try{
        const dados = await Usuario.bulkCreate(valores)
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao cadastrar os dados!!!!',err)
        res.status(500).json({message: 'Erro ao cadastrar os dados!!!!'})
    }
}

const listar = async (req, res) => {
    try {
        const valores = await Usuario.findAll();

        if (valores && valores.length > 0) {
            console.log(valores);
            return res.status(200).json(valores);
        } else {
            console.log('Nenhum dado encontrado.');
            return res.status(404).json({ message: 'Dados não encontrados' });
        }
    } catch (err) {
        console.error('Erro ao listar os dados!', err);
        return res.status(500).json({ message: 'Erro ao listar os dados!' });
    }
};

const atualizar = async (req,res)=>{
    const idUsuario = req.params.id
    const valores = req.body
    try{
        let dados = await Usuario.findByPk(idUsuario)
        if(dados){
            await Usuario.update(valores, {where: { id: idUsuario}})
            dados = await Usuario.findByPk(idUsuario)
            res.status(200).json(dados)
        }else{
            console.log('Usuário não encontrado')
            res.status(404).json({message: 'Usuário não encontrado!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const apagar = async (req,res)=>{
    const idUsuario = req.params.id
    console.log(idUsuario)
    try{
        const valor = await Usuario.findByPk(idUsuario)
        if(valor == null){
            res.status(404).json({message: 'Usuário não encontrado!'})
        }else{
            await Usuario.destroy({where: { id: idUsuario}})
            res.status(204).json({message: 'Dados excluídos com sucesso!!!'})
        }    
    }catch(err){
        console.error('Erro ao apagar os dados!!!!',err)
        res.status(500).json({message: 'Erro ao apagar os dados!'})
    }
}

module.exports = { cadastrar, listar, atualizar, apagar, cadastrarLote }
