// var database = require("../database/config")

// function cadastrar(nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento, fkEmpresa) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento, fkEmpresa);

//     // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
//     //  e na ordem de inserção dos dados.
//     var instrucaoContato = `
//     INSERT INTO contato VALUES (null, '${nomeCompleto}', '${email}', '${telefone}')`;

//     var instrucaoEmpresa = `
//     INSERT INTO empresa VALUES (null, '${nomeEmpresa}', '${cnpj}')`;

//     var instrucaoLocalizacao = `
//     INSERT INTO localizacaoEmpresa VALUES (null, '${cep}', '${estado}', '${endereco}', '${numeroEnd}', '${bairro}', '${complemento}', '${fkEmpresa}');`;


//     console.log("Executando a instrução SQL: \n" + instrucaoContato);
//     console.log("Executando a instrução SQL: \n" + instrucaoEmpresa);
//     console.log("Executando a instrução SQL: \n" + instrucaoLocalizacao);

//     return Promise.all([
//         database.executar(instrucaoContato),
//         database.executar(instrucaoEmpresa),
//         database.executar(instrucaoLocalizacao)
//     ])
// }

// module.exports = {
//     cadastrar
// };

// -------------- NOVO CÓDIGO 

// var database = require("../database/config");

// function cadastrar(nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento) {
//     console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento);

//     var instrucaoContato = `
//         INSERT INTO contato (nome, email, telefone) VALUES ('${nomeCompleto}', '${email}', '${telefone}');
//     `;

//     var instrucaoEmpresa = `
//         INSERT INTO empresa (nomeEmpresa, CNPJ) VALUES ('${nomeEmpresa}', '${cnpj}');   
//     `;

//     var selectIdEmpresa = `
//     SELECT idEmpresa FROM empresa WHERE nomeEmpresa = '${nomeEmpresa}' AND CNPJ = '${cnpj}' ORDER BY idEmpresa DESC LIMIT 1;
//     `;

//     console.log("Executando a instrução SQL: \n" + instrucaoContato);
//     console.log("Executando a instrução SQL: \n" + instrucaoEmpresa);

//     return Promise.all([
//         database.executar(instrucaoContato),
//         database.executar(instrucaoEmpresa)
//         // database.executar(instrucaoContato)

//         .then(() => {
//             console.log("Executando a instrução SQL: \n" + selectIdEmpresa);
//             return database.executar(selectIdEmpresa);
//         })
//         .then(result => {
//             // if (result.length >= 0) {
//                 var idEmpresaDaVez = result[0].idEmpresa;
//                 var instrucaoLocalizacao = `
//                     INSERT INTO localizacaoEmpresa (CEP, estado, logradouro, numero, bairro, complemento, fkEmpresa) VALUES ('${cep}', '${estado}', '${endereco}', '${numeroEnd}', '${bairro}', '${complemento}', '${idEmpresaDaVez}');
//                 `;
//                 console.log("Executando a instrução SQL: \n" + instrucaoLocalizacao);
//                 return database.executar(instrucaoLocalizacao);
//             // } 
//             // else {
//             //     throw new Error("Empresa não encontrada após inserção.");
//             // }
//         })
//         .catch(err => {
//             console.error("Erro ao cadastrar dados: ", err);
//         })

//     ]);
// }

// module.exports = {
//     cadastrar
// };

var database = require("../database/config");

function cadastrar(nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, estado, endereco, numeroEnd, bairro, complemento);

    var instrucaoEmpresa = `
        INSERT INTO empresa (nomeEmpresa, CNPJ) VALUES ('${nomeEmpresa}', '${cnpj}')
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
                INSERT INTO contato (nome, email, telefone, fkEmpresa) VALUES ('${nomeCompleto}', '${email}', '${telefone}' , ${fkEmpresa})
                `;

                var instrucaoLocalizacao = `
                    INSERT INTO localizacaoEmpresa (CEP, estado, logradouro, numero, bairro, complemento, fkEmpresa) VALUES ('${cep}', '${estado}', '${endereco}', '${numeroEnd}', '${bairro}', '${complemento}', ${fkEmpresa});
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