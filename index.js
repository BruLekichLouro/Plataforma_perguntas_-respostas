const express = require("express"); //importando
const app = express(); //criando instancia

//Dizendo ao Express para usar o EJS como view engine
app.set('view engine', 'ejs');

//Dizendo ao Express pra usar arquivos estáticos da pasta public
app.use(express.static('public'));

//Criando rota:
app.get("/:nome/:lang",(req,res) => {
    var nome = req.params.nome; //parametros obrigatórios
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome:"Doritos", preco: 3.14},
        {nome: "Tortinhas", preco: 2.5},
        {nome: "Leite", preco: 5.20},
        {nome: "chocolate", preco: 7}
    ]

    res.render("index", { //passando valores que vou mostrar no html
        nome:nome,
        lang: lang,
        empresa: "Byjus",
        msg: exibirMsg,
        produtos: produtos
    });
});

//Criando servidor:
app.listen(8080, () =>{console.log("App rodando!");});