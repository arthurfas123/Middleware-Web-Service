express = require("express");
cors = require("cors");
app = express();
port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port,() => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

app.post("/clientes", (req, res) => {
    console.log(req.body);
    res.send("Requisicao recebida e respondida");
})