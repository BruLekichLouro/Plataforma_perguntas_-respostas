const express = require("express"); //importando
const app = express(); //criando instancia
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");//importando Model de perguntas

//Database:
connection
    .authenticate() //ou vai autenticar ou vai dar erro
    .then(() =>{ //qdo autenticação ocorreu com sucesso
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => { //qdo ocorreu um erro
        console.log(msgErro);
    })

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
    //findAll() = SELECT * FROM PERGUNTAS.Lista as perguntas e manda pra dentro do then()
    Pergunta.findAll({raw:true, order:[
        ['id','DESC'] //ordenar o id de forma decrescente, posso fazer o mesmo com titulo
    ]}).then(perguntas => {//raw: pega os dados crus, sem mais nada
        res.render("index",{
            perguntas:perguntas
        });
    }); 
});

app.get("/perguntar", (req, res)=> {
    res.render("perguntar");
})

//Rota com .post para receber dados do form:
app.post("/salvarpergunta", (req, res) =>{

    var titulo = req.body.titulo; //body-parser disponibiliza objetos do body pra gente
    var descricao = req.body.descricao;
    //create() = salva pergunta no BD = INSERT INTO Perguntas..
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/"); //redireciono à página principal
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        //Usar o where para criar uma condição
        where:{id:id} //json vai buscar no BD uma pergunta que tenha o id igual a var id
    }).then(pergunta => { //dps que faz a busca , o then retorna algo (a pergunta)
        if(pergunta != undefined){
            res.render('pergunta', {
                pergunta:pergunta
            });
        }else{
            res.redirect('/'); //redirecionar para página principal
        }
    })
})

//Criando servidor:
app.listen(8080, () =>{console.log("App rodando!");});