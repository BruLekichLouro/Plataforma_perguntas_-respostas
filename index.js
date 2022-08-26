const express = require("express"); //importando
const app = express(); //criando instancia

//Dizendo ao Express para usar o EJS como view engine
app.set('view engine', 'ejs');

//Dizendo ao Express pra usar arquivos estáticos da pasta public
app.use(express.static('public'));

//Criando rota:
app.get("/",(req,res) => {
    res.render("index");
});

app.get("/perguntar", (req, res)=> {
    res.render("perguntar");
})

//Criando servidor:
app.listen(8080, () =>{console.log("App rodando!");});