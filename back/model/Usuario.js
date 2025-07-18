const { DataTypes } = require('sequelize')
const conn = require('../db/conn')

const Usuario = conn.define('usuario',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    primeiroNome: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    telefone: {
        type: DataTypes.CHAR,
        unique: true,
        allowNull: false
    },
    endereco: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    cidade: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    estado: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    dataNasc: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'usuarios',
    timestamps: false
})

module.exports = Usuario