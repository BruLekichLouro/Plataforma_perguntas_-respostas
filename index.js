const express = require("express"); //importando
const app = express(); //criando instancia
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");//importando Model de perguntas
const Resposta = require("./database/Resposta");

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
});

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

//Rota para mostrar as perguntas e respostas na tela:
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        //Usar o where para criar uma condição
        where:{id:id} //json vai buscar no BD uma pergunta que tenha o id igual a var id
    }).then(pergunta => { //dps que faz a busca , o then retorna algo (a pergunta)
        if(pergunta != undefined){

            Resposta.findAll({
                where:{perguntaId:pergunta.id},
                order:[
                    ['id','DESC']]
            }).then(respostas => { //respostas são salvas em um array
                res.render('pergunta', {
                    pergunta:pergunta,
                    respostas:respostas
                }); 
            });
        }else{
            res.redirect('/'); //redirecionar para página principal
        }
    })
});

//Rota para enviar as prespostas do form para o bd:
app.post("/responder",(req, res)=>{
    var corpo= req.body.corpo //recebo o conteúdo
    var perguntaId= req.body.pergunta //recebo o id
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{ //qdo responder a pergunta vou redirecionar o usuário para a pág da pergunta
        res.redirect("/pergunta/"+perguntaId);
    });
});

//Criando servidor:
app.listen(8080, () =>{console.log("App rodando!");});