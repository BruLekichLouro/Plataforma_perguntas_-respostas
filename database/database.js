//Criando conexão com o Sequelize:
const Sequelize = require('sequelize');

//Construindo conexão com nome, usuário (por padrao sempre 'root') e senha:
const connection = new Sequelize('guia_perguntas', 'root', '1169',{
    host:'localhost', //onde está rodando 
    dialect:'mysql' //qual tipo de bd quero me conectar
});

//Exportar conexão para utilizar em outros arquivos:
module.exports = connection;