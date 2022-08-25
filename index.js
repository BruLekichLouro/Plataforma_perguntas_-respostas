const express = require("express"); //importando
const app = express(); //criando instancia

//Dizendo ao Express para usar o EJS como view engine
app.set('view engine', 'ejs');

//Dizendo ao Express pra usar arquivos estáticos da pasta public
app.use(express.static('public'));

//Criando rota:
app.get("/",(req,res) => {
    
    res.render("index", { //passando valores que vou mostrar no html
        
    });
});

//Criando servidor:
app.listen(8080, () =>{console.log("App rodando!");});