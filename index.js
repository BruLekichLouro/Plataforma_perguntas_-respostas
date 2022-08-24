const express = require("express"); //importando
const app = express(); //criando instancia

//Dizendo ao Express para usar o EJS como view engine
app.set('view engine', 'ejs');

//Criando rota:
app.get("/:nome/:lang",(req,res) => {
    var nome = req.params.nome; //parametros obrigatórios
    var lang = req.params.lang;
    var exibirMsg = false;

    res.render("index", { //passando valores que vou mostrar no html
        nome:nome,
        lang: lang,
        empresa: "Byjus",
        msg: exibirMsg
    });
});

//Criando servidor:
app.listen(8080, () =>{
    console.log("App rodando!");
});