const Produto = require('../model/Produto')

const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        const dados = await Produto.create(valores)
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao cadastrar os dados!',err)
        res.status(500).json({message: 'Erro ao cadastrar os dados!'})
    }
}

const listar = async (req,res)=>{
    try{
        const valores = await Produto.findAll()
        res.status(200).json(valores)
        if(valores){
        res.status(200).json(valores)
        console.log(valores)
         }else{
        res.status(404).json({message: 'Dados não encontrados'})
        console.log(valores)
          }
    }catch(err){
        console.error('Erro ao listar os dados!',err)
        res.status(500).json({message: 'Erro ao listar os dados!'})
    }
}

const atualizar = async (req,res)=>{
    const idProduto = req.params.id
    const valores = req.body
    try{
        let dados = await Produto.findByPk(idProduto)
        if(dados){
            await Produto.update(valores, {where: { id: idProduto}})
            dados = await Produto.findByPk(idProduto)
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: 'Produto não encontrado!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const apagar = async (req,res)=>{
    const idProduto = req.params.id
    console.log(idProduto)
    try{
        const valor = await Produto.findByPk(idProduto)
        if(valor == null){
            res.status(404).json({message: 'Produto não encontrado!'})
        }else{
            await Produto.destroy({where: { id: idProduto}})
            res.status(204).json({message: 'Dados excluídos com sucesso!'})
        }    
    }catch(err){
        console.error('Erro ao apagar os dados!',err)
        res.status(500).json({message: 'Erro ao apagar os dados!'})
    }
}

module.exports = { cadastrar, listar, atualizar, apagar }
