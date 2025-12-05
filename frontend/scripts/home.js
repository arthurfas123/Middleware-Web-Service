const btnLogin = document.getElementById("login");
const btnCadastrar = document.getElementById("cadastrar");
const nome = document.getElementById("nome");
const senha = document.getElementById("senha");
const token = "senha123";

btnLogin.addEventListener("click", () => {
    fetch("https://localhost:3000/login", {
        method: "post",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nome: nome.value, senha: senha.value})
    })
    .then(res => {
        if(res.ok)
        {
            window.location.href = "cadastrar.html";
        }
        else
        {
            return res.json();
        }
    })
    .then(res => {
        alert(res.resposta);
    })
})

btnCadastrar.addEventListener("click", () => {
    fetch("https://localhost:3000/cadastrar",{
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({nome: nome.value, senha: senha.value})
    })
    .then(res => res.json())
    .then(dados => alert(dados.resposta))
})