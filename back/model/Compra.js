const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Compra = db.define('compra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    precoUnitario: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    descontoAplicado: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    precoFinal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    formaPagamento: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    statusCompra: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    idProduto:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id'
        }
    }
    
},{
    tableName: 'compras',
    timestamps: false
})

module.exports = Compra