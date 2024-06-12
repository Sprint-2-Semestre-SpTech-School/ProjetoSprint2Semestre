var database = require("../database/config");

function cadastrar(nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento);

    var instrucaoEmpresa = `
        INSERT INTO Empresa (nomeEmpresa, CNPJ) VALUES ('${nomeEmpresa}', '${cnpj}')
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoEmpresa);

    return database.executar(instrucaoEmpresa)
        .then(result => {
            console.log("Resultado da inserção em empresa:", result);
            var selectIdEmpresa = `
                SELECT idEmpresa FROM empresa WHERE nomeEmpresa = '${nomeEmpresa}' AND CNPJ = '${cnpj}' ORDER BY idEmpresa DESC LIMIT 1;
            `;
            console.log("Executando a instrução SQL: \n" + selectIdEmpresa);
            return database.executar(selectIdEmpresa);
        })
        .then(result => {
            console.log("Resultado da consulta de idEmpresa:", result);
            if (result.length > 0) {
                var fkEmpresa = result[0].idEmpresa;
                console.log("fkEmpresa obtido: ", fkEmpresa);

                var instrucaoContato = `
                INSERT INTO Contato (nome, email, telefone, fkEmpresa) VALUES ('${nomeCompleto}', '${email}', '${telefone}' , ${fkEmpresa})
                `;

                var instrucaoLocalizacao = `
                    INSERT INTO LocalizacaoEmpresa (CEP, estado, logradouro, numero, bairro, complemento, fkEmpresa) VALUES ('${cep}', '${estado}', '${endereco}', '${numeroEnd}', '${bairro}', '${complemento}', ${fkEmpresa});
                `;
                console.log("Executando a instrução SQL: \n" + instrucaoLocalizacao);
                database.executar(instrucaoLocalizacao);
                console.log("Executando a instrução SQL: \n" + instrucaoLocalizacao);
                return database.executar(instrucaoContato);
            } else {
                throw new Error("Empresa não encontrada após inserção.");
            }
        })
        .then(result => {
            console.log("Resultado da inserção em localizacaoEmpresa:", result);
        })
        .catch(err => {
            console.error("Erro ao cadastrar dados: ", err);
        });
}

module.exports = {
    cadastrar
};