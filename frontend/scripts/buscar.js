let cpf = document.getElementById("cpf")
let botao = document.getElementById("botao")
let busca = document.getElementById("busca")

function botaoClicado()
{
    console.log("O botao foi clicado")
    let cpfValor = cpf.value;
    fetch(`https://localhost:3000/clientes?cpf=${cpfValor}`, {
        method: "GET"
    })
    .then(res => {
        if(!res.ok)
        {
            throw new Error("Usuario não encontrado");
        }
        return res.json();
    })
    .then(dados => {
        busca.innerHTML = `
            <tr>
                <th scope="row">${dados.id}</th>
                <td>${dados.nome}</td>
                <td>${dados.cpf}</td>
            </tr>
        `;
    })
    .catch(erro => {
        busca.innerHTML = `
            <tr>
                <td>Usuario não encontrado</td>
            </tr>
        `;
    })
}

botao.addEventListener("click", botaoClicado)