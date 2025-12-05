const express = require("express");
const { encriptar, decriptar } = require("./criptografia");
const cors = require("cors");
const https = require("https"); 
const fs = require("fs");       
const clienteController = require("./clienteController");
const path = require("path");

let UsuariosCadastrados = [];

const app = express();
const port = 3000;
const token = "senha123";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

function verificaToken(req, res, next)
{
    const tokenCliente = req.headers['authorization'];

    if(tokenCliente == token)
    {
        next();
    }
    else
    {
        res.status(401).json({mensagem: "Acesso negado Token invalido"});
    }
}

const httpsOptions = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
};

app.get("/", (req, res) => {
    res.send("Servidor HTTPS funcionando!");
});

app.post("/clientes", clienteController.cadastrar);
app.get("/clientes", clienteController.buscar);
app.post("/login", verificaToken, (req, res) => {
    const busca = UsuariosCadastrados.find(user => user.nome == req.body.nome)
    if(busca)
    {
        res.json({autorizado: true, destino:"/cadastrar.html"});
    }
    else
    {
        res.status(401).json({resposta: "Usuario não encontrado"});
    }
});
app.post("/cadastrar", verificaToken, (req, res) => {
    res.json({resposta: "Usuario cadastrado"});
    UsuariosCadastrados.push(req.body);
});
app.post("/", (req, res) => {
    console.log("Servidor liberado!");
})

https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Servidor HTTPS rodando em https://localhost:${port}`);
});