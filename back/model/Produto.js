const {DataTypes} = require ('sequelize')
const db = require ('../db/conn')

const Produto = db.define('produto',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo:{
        type:DataTypes.STRING(200),
        allowNull:false
    },
    descricao:{
        type:DataTypes.TEXT,
        allowNull: true
    },
    categoria:{
        type:DataTypes.STRING(200),
        allowNull: true
    },
    preco:{
        type:DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    percentualDesconto:{
        type:DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    estoque:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    marca:{
        type:DataTypes.STRING(200),
        allowNull: false
    },
    imagem:{
        type:DataTypes.STRING(200),
        allowNull: false
    },

},{
    tableName: 'produtos',
    timestamps: false
})

module.exports = Produto