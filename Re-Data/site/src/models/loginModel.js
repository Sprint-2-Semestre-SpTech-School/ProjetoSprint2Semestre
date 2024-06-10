var database = require("../database/config")

function entrar(nomeUsuario, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", nomeUsuario, senha)
    var instrucao = `
        SELECT idConta as id, login, senha, fkEmpresa as idEmpresa FROM Conta WHERE login = '${nomeUsuario}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar
};