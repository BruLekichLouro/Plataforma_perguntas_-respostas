const express = require("express"); //importando
const app = express(); //criando instancia
const bodyParser = require("body-parser");

//Dizendo ao Express para usar o EJS como view engine
app.set('view engine', 'ejs');

//Dizendo ao Express pra usar arquivos estáticos da pasta public
app.use(express.static('public'));

//Configurando o body-parser: ele transformar os dados do form em uma estrutura JS
app.use(bodyParser.urlencoded({extended:false}));

//Para ler dados de formulário enviados via .json():
app.use(bodyParser.json());

app.use(express.text()); 

//Criando rota:
app.get("/",(req,res) => {
    res.render("index");
});

app.get("/perguntar", (req, res)=> {
    res.render("perguntar");
})

//Rota com .post para receber dados do form:
app.post("/salvarpergunta", (req, res) =>{
    var titulo = req.body.titulo; //body-parser disponibiliza objetos do body pra gente
    var descricao = req.body.descricao;
    res.send("formulario recebido titulo "+ titulo + " " + "descricao" + descricao);
});

//Criando servidor:
app.listen(8080, () =>{console.log("App rodando!");});