let nome = document.getElementById("nome");
let cpf = document.getElementById("cpf");
let botao = document.getElementById("botao");

function botaoClicado()
{
    console.log("O botão foi clicado.");

    let nomeValor = nome.value;
    let cpfValor = cpf.value;
    
    const usuario = {nome: nomeValor, cpf: cpfValor};
    const jasonObj = JSON.stringify(usuario);
    nome.value = "";
    cpf.value = "";
    console.log("Objeto json criado.")

    fetch("https://localhost:3000/clientes", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: jasonObj
    })
    .then(res => res.text())
    .then(res => console.log(res))
}

botao.addEventListener("click", botaoClicado);
