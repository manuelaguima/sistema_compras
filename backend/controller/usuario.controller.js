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

const { Op } = require('sequelize');

const listarUsuariosGrafico = async (req, res) => {
  try {
    let { idIni, idFim } = req.query;

    idIni = Number(idIni) || 0;
    idFim = Number(idFim) || idIni + 9;

    // Limite de 10 IDs no intervalo
    if (idFim - idIni >= 10) idFim = idIni + 9;

    const usuarios = await Usuario.findAll({
      where: {
        id: {
          [Op.between]: [idIni, idFim],
        }
      },
      attributes: ['primeiroNome', 'sobrenome', 'idade'],
      limit: 10
    });

    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }

    return res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    return res.status(500).json({ message: 'Erro interno ao buscar usuários.' });
  }
};

module.exports = {
  listarUsuariosGrafico,
};


module.exports = { cadastrar, listar, atualizar, apagar, cadastrarLote, listarUsuariosGrafico }
