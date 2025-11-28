const xml2js = require('xml2js');

const bancoLegadoXML = []; 

const clienteModel = {
    salvarXML: (xmlString) => {
        const novoId = bancoLegadoXML.length + 1;
        bancoLegadoXML.push({ id: novoId, xml: xmlString });
        return novoId;
    },

    listarXMLs: () => {
        return bancoLegadoXML;
    }
}

module.exports = clienteModel;