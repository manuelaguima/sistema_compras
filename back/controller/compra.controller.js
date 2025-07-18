const Compra = require('../model/Compra')

const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        const dados = await Compra.create(valores)
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao cadastrar os dados!',err)
        res.status(500).json({message: 'Erro ao cadastrar os dados!'})
    }
}

const listar = async (req,res)=>{
    try{
        const valores = await Compra.findAll()
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
    const idCompra = req.params.id
    const valores = req.body
    try{
        let dados = await Compra.findByPk(idCompra)
        if(dados){
            await Compra.update(valores, {where: { idCompra: idCompra}})
            dados = await Compra.findByPk(idCompra)
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: 'Compra não encontrado!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const apagar = async (req,res)=>{
    const idCompra = req.params.id
    console.log(idCompra)
    try{
        const valor = await Compra.findByPk(idCompra)
        if(valor == null){
            res.status(404).json({message: 'Compra não encontrado!'})
        }else{
            await Compra.destroy({where: { idCompra: idCompra}})
            res.status(204).json({message: 'Dados excluídos com sucesso!'})
        }    
    }catch(err){
        console.error('Erro ao apagar os dados!',err)
        res.status(500).json({message: 'Erro ao apagar os dados!'})
    }
}

module.exports = { cadastrar, listar, atualizar, apagar }
