var database = require("../database/config")

function cadastrar(nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoContato = `
    INSERT INTO contato (nome, email, telefone) VALUES ('${nomeCompleto}', '${email}', '${telefone}')`;

    var instrucaoEmpresa = `
    INSERT INTO Empresa (nomeEmpresa, CNPJ) VALUES ('${nomeEmpresa}', '${cnpj}')`;

    var instrucaoLocalizacao = `
    INSERT INTO localizacaoEmpresa (CEP, estado, logradouro, numero, bairro, complemento) VALUES ('${cep}', '${estado}', '${endereco}', '${numeroEnd}', '${bairro}', '${complemento}');`;

    // var instrucao = `
    //     INSERT INTO Empresa (nomeEmpresa, CNPJ) VALUES ('${nomeEmpresa}', '${cnpj}');
    // `;

    // var instrucao = `
    // INSERT INTO localizacaoEmpresa (CEP, estado, endereco, numero, bairro, complemento) VALUES ('${cep}', '${estado}', '${endereco}', '${numeroEnd}', '${bairro}', '${complemento}');
    // `;


    console.log("Executando a instrução SQL: \n" + instrucaoContato);
    console.log("Executando a instrução SQL: \n" + instrucaoEmpresa);
    console.log("Executando a instrução SQL: \n" + instrucaoLocalizacao);

    return Promise.all([
        database.executar(instrucaoContato),
        database.executar(instrucaoEmpresa),
        database.executar(instrucaoLocalizacao)
    ])
}

module.exports = {
    cadastrar
};