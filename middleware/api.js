const express = require("express");
const { encriptar, decriptar } = require("./criptografia");
const cors = require("cors");
const https = require("https"); 
const fs = require("fs");       
const clienteController = require("./clienteController"); 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const httpsOptions = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
};

app.get("/", (req, res) => {
    res.send("Servidor HTTPS funcionando!");
});

app.post("/clientes", clienteController.cadastrar);
app.get("/clientes", clienteController.buscar);

https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Servidor HTTPS rodando em https://localhost:${port}`);
});