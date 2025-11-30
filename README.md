# Middleware-Web-Service

## Descrição do Projeto
Este projeto é um Middleware Web Service desenvolvido em Node.js. Ele atua como intermediário entre clientes externos (Frontend Web) e um Sistema Legado simulado. Sua função é receber requisições JSON via HTTPS, converter os dados para XML e criptografar informações sensíveis (CPF) antes de armazená-las no sistema legado.

## Tecnologias Utilizadas
* **Runtime:** Node.js
* **Framework Web:** Express
* **Manipulação de XML:** xml2js (conversão JSON <-> XML)
* **Segurança (Transporte):** HTTPS com certificado autoassinado (OpenSSL)
* **Segurança (Dados):** Criptografia simétrica customizada (Cifra de deslocamento) para proteção do CPF.
* **Frontend:** HTML5, JavaScript (Fetch API).

## Como Executar o Projeto

1. Instale as dependências:
   npm install

2. Inicie o servidor:
   node api.js

3. Acesse a aplicação:
   Abra o navegador em https://localhost:3000

   *OBSERVAÇÃO SOBRE HTTPS:* Como o certificado SSL utilizado é autoassinado (gerado para ambiente de desenvolvimento), o navegador exibirá um alerta de segurança ("Sua conexão não é particular"). É necessário clicar em "Avançado" -> "Ir para localhost (não seguro)" para aceitar o certificado e testar a aplicação.

## Relatório de Criptografia e Segurança

**1. Algoritmo Utilizado:**
Foi utilizada uma criptografia simétrica baseada em substituição e deslocamento (Cifra de César modificada). A escolha foi feita para fins didáticos de demonstração de ofuscação de dados sensíveis.

**2. Gerenciamento de Chaves:**
A chave de criptografia (um inteiro numérico) é armazenada de forma segura no lado do servidor (Back-end) e nunca é exposta ao cliente (Frontend).

**3. Dados Criptografados:**
Apenas o campo `cpf` é criptografado. O `nome` trafega em texto claro dentro do XML, enquanto o CPF é armazenado de forma ilegível no banco de dados simulado para garantir a confidencialidade em repouso.

**4. Segurança da Comunicação:**
Foi implementado HTTPS para garantir que dados trafeguem criptografados (TLS) entre o cliente e o middleware, prevenindo ataques de "Man-in-the-Middle".