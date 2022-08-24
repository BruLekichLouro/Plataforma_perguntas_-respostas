const express = require("express"); //importando
const app = express(); //criando instancia

//Criando rota:
app.get("/",(req,res) => {
    res.send("Bem vindo ao meu site")
});

//Criando servidor:
app.listen(8080, () =>{
    console.log("App rodando!");
});