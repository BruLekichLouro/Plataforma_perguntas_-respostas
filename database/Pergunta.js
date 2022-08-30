//Importando Sequelize:
const Sequelize = require('sequelize');

//Importando conexão com BD:
const connection = require("./database");

//Criando tabela:
//Definindo o model = ...define(nometabela, { json})
const Pergunta = connection.define('perguntas',{
    titulo:{
        type:Sequelize.STRING, //tipo vai se um texto então usamos string
        allowNull: false //impede que campo receba valores falsos
    },
    descricao:{
        type: Sequelize.TEXT, //string = textos curtos e text= textos longos
        allowNull: false
    }
});

//Sincronizando Pergunta.js com o BD: se a tabela ainda não existir no BD, ele vai criar. Se já existir, nada acontece.
Pergunta.sync({force:false}).then(() => {});