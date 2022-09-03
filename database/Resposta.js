const Sequelize = require('sequelize');
const connection = require("./database");

//Definindo o model e criando tabela "respostas"
const Resposta = connection.define("respostas", {
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{ //Relacionamento:vai salvar o id da pergunta que respondi =>relacionar a resp com a perg
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force:false});

module.exports = Resposta;