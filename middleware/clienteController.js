const xml2js = require('xml2js');
const { encriptar, decriptar } = require('./criptografia');
const model = require('./clienteModel');

const contas = [];
const CHAVE_CRIPTOGRAFIA = 5; 

async function cadastrar(req, res)
{
    const { nome, cpf } = req.body;
    const cpfCriptografado = encriptar(CHAVE_CRIPTOGRAFIA, cpf);

    const clienteObj = {
        cliente: {
            nome: nome,
            cpf: cpfCriptografado
        }
    };

    const builder = new xml2js.Builder();
    const xmlGerado = builder.buildObject(clienteObj);

    console.log("--- XML Enviado ao Legado ---");
    console.log(xmlGerado);

    const id = model.salvarXML(xmlGerado);

    res.json({ mensagem: "Cliente cadastrado com sucesso", id: id });
}

async function buscar(req, res)
{
    const cpfBuscado = req.query.cpf; 

    if (!cpfBuscado)
    {
        return res.status(400).json({ erro: "CPF é obrigatório" });
    }

    const listaXML = model.listarXMLs();
    const parser = new xml2js.Parser({ explicitArray: false });

    let clienteEncontrado = null;

    for (let item of listaXML) 
    {
        const result = await parser.parseStringPromise(item.xml);
        const cpfNoBancoDecriptado = decriptar(CHAVE_CRIPTOGRAFIA, result.cliente.cpf);

        if (cpfNoBancoDecriptado === cpfBuscado)
        {
            clienteEncontrado = {
                id: item.id,
                nome: result.cliente.nome,
                cpf: cpfNoBancoDecriptado 
            };
            break;
        }
    }

    if (clienteEncontrado)
    {
        res.json(clienteEncontrado);
    }
    else
    {
        res.status(404).json({ erro: "Cliente não encontrado" });
    }
}

module.exports = { cadastrar, buscar };